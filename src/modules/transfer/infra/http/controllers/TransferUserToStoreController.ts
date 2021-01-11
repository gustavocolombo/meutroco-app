import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransferService from '@modules/transfer/services/CreateTransferUserToStoreService';

export default class TransferUserToStoreController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { document, agency, numberAccount, value } = req.body;

    const createTransfer = container.resolve(CreateTransferService);

    const transfer = await createTransfer.execute({
      user_id,
      document,
      agency,
      numberAccount,
      value,
    });

    return res.json(transfer);
  }
}
