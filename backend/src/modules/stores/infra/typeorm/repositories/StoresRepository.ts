import { getRepository, Repository } from 'typeorm';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';

import Stores from '../entities/Stores';

class StoresRepository implements IStoresRepository {
  private ormRepository: Repository<Stores>;

  constructor() {
    this.ormRepository = getRepository(Stores);
  }

  public async findById(id: string): Promise<Stores | undefined> {
    const store = await this.ormRepository.findOne(id);

    return store;
  }

  public async findByDocument(document: string): Promise<Stores | undefined> {
    const store = await this.ormRepository.findOne({ where: { document } });

    return store;
  }

  public async create(storeData: ICreateStoreDTO): Promise<Stores> {
    const store = this.ormRepository.create(storeData);

    await this.ormRepository.save(store);

    return store;
  }

  public async save(store: Stores): Promise<Stores> {
    return this.ormRepository.save(store);
  }
}

export default StoresRepository;
