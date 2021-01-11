import ITransferCreateDTO from '@modules/transfer/dto/ITransferCreateDTO';
import Transfer from '@modules/transfer/infra/typeorm/entities/Transfer';

export default interface ITransferRepository {
  create(data: ITransferCreateDTO): Promise<Transfer>;
  save(transfer: Transfer): Promise<Transfer | null>;
}
