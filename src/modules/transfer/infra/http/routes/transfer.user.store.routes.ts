import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import TransferUserToStoreController from '../controllers/TransferUserToStoreController';

const transferUserStoreRouter = Router();
const transferUserStoreController = new TransferUserToStoreController();

transferUserStoreRouter.use(ensureAuthenticated);

transferUserStoreRouter.post('/', transferUserStoreController.create);

export default transferUserStoreRouter;
