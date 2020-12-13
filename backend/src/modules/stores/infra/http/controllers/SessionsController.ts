import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticatedStoreService from '@modules/stores/services/AuthenticatedStoreService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { document, password } = req.body;

    const authenticateStore = container.resolve(AuthenticatedStoreService);

    const { store, token } = await authenticateStore.execute({
      document,
      password,
    });

    // delete user.password;
    Object.assign(store, { password: undefined });

    return res.json({ store, token });
  }
}
