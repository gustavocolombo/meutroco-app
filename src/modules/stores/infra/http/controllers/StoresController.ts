import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStoreService from '@modules/stores/services/CreateStoreService';
import CreateAccountService from '@modules/accounts/services/CreateAccountService';

export default class StoresController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      document,
      password,
      phone,
      latitude,
      longitude,
      registration,
    } = req.body;

    const createStore = container.resolve(CreateStoreService);
    const createAccount = container.resolve(CreateAccountService);

    const account = await createAccount.execute();

    const store = await createStore.execute({
      document,
      password,
      phone,
      latitude,
      longitude,
      registration,
      account,
    });

    // delete user.password;
    Object.assign(store, { password: undefined });

    return res.json({ store });
  }
}
