import { injectable, inject } from 'tsyringe';
import User from "@modules/users/infra/typeorm/entities/User";
import { TypeAccount } from "@modules/accounts/infra/typeorm/entities/Account"
import IAccountRepository from '../repositories/IAccountRepository';
import Stores from '@modules/stores/infra/typeorm/entities/Stores';

interface IResquest {
  type: 'enterprise' | 'personal',
  user?: User,
  store?: Stores,
}

@injectable()
class CreateAccountEnterpriseService {

  constructor(
    @inject('AccountRepository')
    private accountRepository: IAccountRepository
  ) { }


  public async execute(data: IResquest) {
    const account = await this.accountRepository.createEnterprise({
      type: TypeAccount.ENTEPRISE,
      store: data.store
    })
    return account
  }
}

export default CreateAccountEnterpriseService
