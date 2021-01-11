import { injectable, inject } from 'tsyringe';

import IAccountRepository from '../repositories/IAccountRepository';

interface IResquest {
  agency: number;
  numberAccount: number;
}

@injectable()
class CreateAccountPersonalService {
  constructor(
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
  ) {}

  public async execute(): Promise<Account> {
    const account = await this.accountRepository.create();
    return account;
  }
}

export default CreateAccountPersonalService;
