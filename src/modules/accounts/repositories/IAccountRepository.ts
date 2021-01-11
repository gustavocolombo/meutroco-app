import Account from '../infra/typeorm/entities/Account';
import IAccountCreateDTO from '../dtos/IAccountCreateDTO';

export default interface IAccountRepository {
  findById(id: string): Promise<Account | undefined>;
  // findBalance(id: string): Promise<Account | undefined>;
  create(data: IAccountCreateDTO): Promise<Account>;
  save(account: Account): Promise<Account>;
}
