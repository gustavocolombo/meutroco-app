import { injectable, inject } from 'tsyringe';

import ITransferRepository from '../repositories/ITransferRepository';
import IAccountRepository from '@modules/accounts/repositories/IAccountRepository';
import AppError from '@shared/errors/AppError';
import Account from '@modules/accounts/infra/typeorm/entities/Account';

interface IRequest {
  accountSenderId: string;
  accountRecipientId: string;
  value: number;
}

interface IResponse {
  transfer_id:string;
  accountSender: Account;
  accountRecipient: Account;
  value: number;
}

@injectable()
class CreateTransferService {
  constructor(
    @inject('TransferRepository')
    private transferRepository: ITransferRepository,
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,


  ) { }

  public async execute({ accountSenderId, accountRecipientId, value }: IRequest): Promise<IResponse> {

    const accountSender = await this.accountRepository.findById(accountSenderId);

    const accountRecipient = await this.accountRepository.findById(accountRecipientId);

    if (!accountSender) throw new AppError('Account sender not found!');

    if (!accountRecipient) throw new AppError('Account recipient not found!');

    if(accountSender.id === accountRecipient.id) throw new AppError('You can not transfer to own account');

    if (accountSender.balance < value) throw new AppError('Insuficient found!');

    if (!accountSender.active) throw new AppError('Account sender not active!');

    if (!accountRecipient.active) throw new AppError('Account recipient not active!');

    const accountSenderBalance = accountSender.balance;

    const accountRecipientBalance = accountRecipient.balance;

    accountSender.balance = accountSenderBalance - value;

    accountRecipient.balance = accountRecipientBalance + value;


    this.accountRepository.save(accountSender);

    this.accountRepository.save(accountRecipient);

    const transfer = await this.transferRepository.create({
      accountSender,
      accountRecipient,
      value
    });

    return {
      transfer_id:transfer.id,
      accountSender,
      accountRecipient,
      value
    };
  }
}

export default CreateTransferService;
