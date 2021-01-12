import express from 'express';
import BalanceController from '@modules/users/infra/http/controllers/BalanceController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const balanceRouter = express.Router();

const balanceController = new BalanceController();

balanceRouter.use(ensureAuthenticated);

balanceRouter.get('/', balanceController.show);

export default balanceRouter;
