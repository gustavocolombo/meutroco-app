import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateStoreProfileService from '@modules/stores/services/UpdateStoreProfileService';
import ShowProfileStoreService from '@modules/stores/services/ShowProfileStoreService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const store_id = req.store.id;

    const showProfile = container.resolve(ShowProfileStoreService);

    const store = await showProfile.execute({ store_id });

    // delete user.password;
    Object.assign(store, { password: undefined });

    return res.json(store);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const store_id = req.store.id;
    const { telephone, old_password, password } = req.body;

    const updateProfile = container.resolve(UpdateStoreProfileService);

    const store = await updateProfile.execute({
      store_id,
      telephone,
      old_password,
      password,
    });

    // delete user.password;
    Object.assign(store, { password: undefined });

    return res.json(store);
  }
}
