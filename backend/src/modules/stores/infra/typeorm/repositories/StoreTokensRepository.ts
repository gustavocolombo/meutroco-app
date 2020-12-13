import { getRepository, Repository } from 'typeorm';

import IStoreTokensRepository from '@modules/stores/repositories/IStoreTokensRepository';

import StoreToken from '../entities/StoreToken';

class StoreTokensRepository implements IStoreTokensRepository {
  private ormRepository: Repository<StoreToken>;

  constructor() {
    this.ormRepository = getRepository(StoreToken);
  }

  public async findByToken(token: string): Promise<StoreToken | undefined> {
    const storeToken = await this.ormRepository.findOne({ where: { token } });

    return storeToken;
  }

  public async generate(store_id: string): Promise<StoreToken> {
    const storeToken = this.ormRepository.create({
      store_id,
    });

    await this.ormRepository.save(storeToken);

    return storeToken;
  }
}

export default StoreTokensRepository;
