import { Router } from 'express';
import TransferController from '../controllers/TransferController';


const transferRouter = Router();
const transferController = new TransferController();

transferRouter.post('/', transferController.transfer);

export default transferRouter;
