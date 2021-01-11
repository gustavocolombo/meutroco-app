import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import TransferController from '../controllers/TransferController';

const transferRouter = Router();
const transferController = new TransferController();

transferRouter.use(ensureAuthenticated);

transferRouter.post('/', transferController.create);

export default transferRouter;
