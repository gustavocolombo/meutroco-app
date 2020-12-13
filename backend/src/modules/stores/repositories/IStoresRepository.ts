import Stores from '../infra/typeorm/entities/Stores';
import ICreateStoreDTO from '../dtos/ICreateStoreDTO';

export default interface IStoresRepository {
  findById(id: string): Promise<Stores | undefined>;
  findByDocument(document: string): Promise<Stores | undefined>;
  create(data: ICreateStoreDTO): Promise<Stores>;
  save(store: Stores): Promise<Stores>;
}
