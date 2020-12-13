import { injectable, inject } from 'tsyringe';
import User from "@modules/users/infra/typeorm/entities/User";
import { TypeAccount } from "@modules/accounts/infra/typeorm/entities/Account"
import IAccountRepository from '../repositories/IAccountRepository';

interface IResquest {
  type: 'enterprise' | 'personal',
  user: User,
}

@injectable()
class CreateAccountPersonalService {

  constructor(
    @inject('AccountRepository')
    private accountRepository: IAccountRepository
  ) { }


  public async execute(data: IResquest) {
    const {  user } = data
    const account = await this.accountRepository.create({
      type:TypeAccount.PERSONAL,
      user
    })
    return account
  }
}

export default CreateAccountPersonalService
