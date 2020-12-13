import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import Stores from '../infra/typeorm/entities/Stores';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  store_id: string;
  telephone: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateStoreProfileService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    store_id,
    telephone,
    old_password,
    password,
  }: IRequest): Promise<Stores> {
    const store = await this.storesRepository.findById(store_id);

    if (!store) {
      throw new AppError('Usuário não existe');
    }

    store.phone = telephone;

    if (password && !old_password) {
      throw new AppError(
        'Você deve informar a senha antiga para alterar a senha.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        store.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Senha antiga incorreta.');
      }

      store.password = await this.hashProvider.generateHash(password);
    }

    return this.storesRepository.save(store);
  }
}

export default UpdateStoreProfileService;
