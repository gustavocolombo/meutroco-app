import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import StoresRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository';

import IAccountRepository from '@modules/accounts/repositories/IAccountRepository';
import AccountRepository from '@modules/accounts/infra/typeorm/repositories/AccountRepository';

import ITransferRepository from '@modules/transfer/repositories/ITransferRepository';
import TransferRepository from '@modules/transfer/infra/typeorm/repositories/TransferRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  StoresRepository,
);

container.registerSingleton<IAccountRepository>(
  'AccountRepository',
  AccountRepository,
);

container.registerSingleton<ITransferRepository>(
  'TransferRepository',
  TransferRepository,
);


