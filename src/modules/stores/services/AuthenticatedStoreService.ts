import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';
import IStoresRepository from '../repositories/IStoresRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Stores from '../infra/typeorm/entities/Stores';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  document: string;
  password: string;
}

interface IResponse {
  user?: User;
  token: string;
  store:Stores;
}

@injectable()
class AuthenticatedStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ document, password }: IRequest): Promise<IResponse> {
    const store = await this.storesRepository.findByDocument(document);

    if (!store) {
      throw new AppError('Incorrect cpf/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      store.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect cpf/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: store.id,
      expiresIn,
    });

    return {
      store,
      token,
    };
  }
}

export default AuthenticatedStoreService;
