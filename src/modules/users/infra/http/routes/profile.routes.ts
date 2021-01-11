import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

// http://localhost:3333/profile
const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
