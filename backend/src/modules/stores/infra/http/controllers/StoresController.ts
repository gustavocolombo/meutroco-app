import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { TypeAccount } from '@modules/accounts/infra/typeorm/entities/Account';

import CreateStoreService from '@modules/stores/services/CreateStoreService';
import CreateAccountEnterpriseService from '@modules/accounts/services/CreateAccountEnterpriseService';

export default class StoresController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { document, password, phone, latitude, longitude, registration, isBranch } = req.body;

    const createStore = container.resolve(CreateStoreService);
    const createAccount = container.resolve(CreateAccountEnterpriseService);

    const store = await createStore.execute({
      document,
      password,
      phone,
      latitude,
      longitude,
      registration,
      isBranch
    });

    const account = await createAccount.execute({ type: TypeAccount.ENTEPRISE, store })
    // delete user.password;
    Object.assign(store, { password: undefined });

    return res.json({ store, account });
  }
}
