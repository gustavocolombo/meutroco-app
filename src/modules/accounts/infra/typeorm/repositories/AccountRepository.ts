import { getRepository, Repository } from 'typeorm';

import IAccountCreateDTO from '@modules/accounts/dtos/IAccountCreateDTO';

import IAccountRepository from '@modules/accounts/repositories/IAccountRepository';
import Account from '../entities/Account';

class AccountRepository implements IAccountRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async findById(id: string): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne(id);
    return account;
  }

  // public async findBalance(id: string): Promise<Account | undefined> {
  //   const account = await this.ormRepository.findOne(id);
  //   return account?.balance;
  // }

  public async create(data: IAccountCreateDTO): Promise<Account> {
    const account = this.ormRepository.create(data);
    await this.ormRepository.save(account);
    return account;
  }

  // public async createEnterprise(data: IAccountCreateDTO): Promise<Account> {
  //   const account = this.ormRepository.create(data);
  //   await this.ormRepository.save(account);
  //   return account;
  // }

  public async save(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }
}

export default AccountRepository;
