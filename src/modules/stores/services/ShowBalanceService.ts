import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  store_id: string;
}

@injectable()
class ShowBalanceStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({ store_id }: IRequest): Promise<number> {
    const store = await this.storesRepository.findById(store_id);

    if (!store) {
      throw new AppError('loja não existe');
    }

    return store.account.balance;
  }
}

export default ShowBalanceStoreService;
