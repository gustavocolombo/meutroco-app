import Account from '@modules/accounts/infra/typeorm/entities/Account';

export default interface ITransferCreateDTO {
  document: string;
  agency: Account;
  numberAccount: Account;
  value: number;
}
