import Account from "@modules/accounts/infra/typeorm/entities/Account";

export default interface IAccountCreateDTO {
  accountSender:Account;
  accountRecipient:Account;
  value:number;
}
