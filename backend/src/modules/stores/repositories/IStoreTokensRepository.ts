import StokeToken from '../infra/typeorm/entities/StoreToken';

export default interface IStoreTokensRepository {
  generate(store_id: string): Promise<StokeToken>;
  findByToken(token: string): Promise<StokeToken | undefined>;
}
