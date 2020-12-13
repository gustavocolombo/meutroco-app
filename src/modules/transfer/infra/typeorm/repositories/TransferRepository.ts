import { getRepository, Repository } from 'typeorm';


import ITransferCreateDTO from '@modules/transfer/dto/ITransferCreateDTO';

import Transfer from '../entities/Transfer';
import ITransferRepository from '@modules/transfer/repositories/ITransferRepository'

class TransferRepository implements ITransferRepository {
  private ormRepository: Repository<Transfer>;

  constructor() {
    this.ormRepository = getRepository(Transfer);
  }

  public async create(data: ITransferCreateDTO): Promise<Transfer> {
    const transfer = this.ormRepository.create(data);
    await this.ormRepository.save(transfer);
    return transfer;
  }
}

export default TransferRepository;
