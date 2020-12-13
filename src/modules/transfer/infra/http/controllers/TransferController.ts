import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransferService from '@modules/transfer/services/CreateTransferService';

export default class TransferController {

  public async transfer(req: Request, res: Response): Promise<Response> {

    const { accountSenderId, accountRecipientId, value } = req.body

    const createTransfer = container.resolve(CreateTransferService);

    const transfer = await createTransfer.execute({
      accountSenderId,
      accountRecipientId,
      value
    });

    return res.json(transfer);
  }
}
