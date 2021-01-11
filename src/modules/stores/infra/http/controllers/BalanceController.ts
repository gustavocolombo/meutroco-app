import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowBalanceService from '@modules/stores/services/ShowBalanceService';

export default class BalanceController {
  public async show(req: Request, res: Response): Promise<Response> {
    const store_id = req.user.id;

    const showProfile = container.resolve(ShowBalanceService);

    const store = await showProfile.execute({ store_id });

    return res.json(store);
  }
}
