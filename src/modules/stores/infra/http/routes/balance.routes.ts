import express from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import BalanceController from '../controllers/BalanceController';

const balanceStoreRouter = express.Router();
const balanceStoreController = new BalanceController();

balanceStoreRouter.use(ensureAuthenticated);

balanceStoreRouter.get('/', balanceStoreController.show);

export default balanceStoreRouter;
