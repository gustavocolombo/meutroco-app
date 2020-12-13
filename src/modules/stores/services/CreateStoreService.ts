import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStoresRepository from '../repositories/IStoresRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Stores from '../infra/typeorm/entities/Stores';

interface IRequest {
  document: string;
  password: string;
  phone: string;
  latitude: number;
  longitude: number;
  registration: string;
  isBranch:boolean;
}

@injectable()
class CreateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
      document,
      password,
      phone,
      latitude,
      longitude,
      registration,
      isBranch
  }: IRequest): Promise<Stores> {
    const checkStoreExist = await this.storesRepository.findByDocument(document);
    if (checkStoreExist) {
      throw new AppError('Cnpj já cadastrado');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const store = await this.storesRepository.create({
      document,
      password: hashedPassword,
      phone,
      latitude,
      longitude,
      registration,
      isBranch
    });

    return store;
  }
}

export default CreateStoreService;
