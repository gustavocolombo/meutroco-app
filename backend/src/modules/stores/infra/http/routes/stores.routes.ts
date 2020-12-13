import { Router } from 'express';

import StoresController from '../controllers/StoresController';

// http://localhost:3333/users
const storesRouter = Router();
const storesController = new StoresController();

storesRouter.post('/', storesController.create);

export default storesRouter;
