import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowBalanceService from '@modules/users/services/ShowBalanceService';

export default class BalanceController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showBalance = container.resolve(ShowBalanceService);

    const balance = await showBalance.execute({ user_id });

    return res.json(balance);
  }
}
