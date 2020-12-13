import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

// http://localhost:3333/sessions
const sessionsStoreRouter = Router();
const sessionsController = new SessionsController();

sessionsStoreRouter.post('/', sessionsController.create);

export default sessionsStoreRouter;
