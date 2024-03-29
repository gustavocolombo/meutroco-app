import { injectable, inject } from 'tsyringe';

import IAccountRepository from '@modules/accounts/repositories/IAccountRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import Account from '@modules/accounts/infra/typeorm/entities/Account';
import ITransferRepository from '../repositories/ITransferRepository';

interface IResponse {
  transfer_id: string;
  user_id: string;
  document: string;
  agency: Account;
  numberAccount: Account;
  value: number;
}

@injectable()
class CreateTransferService {
  constructor(
    @inject('TransferRepository')
    private transferRepository: ITransferRepository,
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({
    user_id,
    document,
    agency,
    numberAccount,
    value,
  }: IRequest): Promise<IResponse> {
    const send_store = await this.storesRepository.findById(user_id);

    if (!send_store) {
      throw new AppError('user sender not found');
    }

    const { account: accountSender } = send_store;

    if (value < 0) {
      throw new AppError('negative value is not allowed');
    }

    let recipient_user;

    if (document.length === 14) {
      recipient_user = await this.usersRepository.findByDocument(document);
    }

    if (!recipient_user) {
      throw new AppError('user to receive not found');
    }

    const { account: accountRecipient } = recipient_user;

    if (
      accountRecipient.agency !== agency ||
      accountRecipient.numberAccount !== numberAccount
    ) {
      throw new AppError('user to receive unvailable');
    }

    if (accountSender.id === accountRecipient.id) {
      throw new AppError('you can not send to own account');
    }

    // if (accountSender.balance === 0) {
    //   throw new AppError(
    //     'this transaction is not allowed, you do not have found',
    //   );
    // }

    accountSender.balance = accountSender.limit_credits_account_store;
    accountSender.balance -= value;
    accountSender.limit_credits_account_store -= value;

    if (accountSender.balance - value < -1) {
      throw new AppError(
        'this transaction is not allowed, you do not have found',
      );
    }

    accountRecipient.balance += value;

    this.accountRepository.save(accountSender);

    this.accountRepository.save(accountRecipient);

    const transfer = await this.transferRepository.create({
      accountSender,
      accountRecipient,
      value,
    });

    return {
      transfer_id: transfer.id,
      accountSender,
      accountRecipient,
      value,
    };
  }
}

export default CreateTransferService;
