import { Router } from 'express';

import UsersController from '../controllers/UsersController';

// http://localhost:3333/users
const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

export default usersRouter;
