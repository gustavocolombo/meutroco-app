import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

// http://localhost:3333/profile
const profileStoreRouter = Router();
const profileController = new ProfileController();

profileStoreRouter.use(ensureAuthenticated);

profileStoreRouter.get('/', profileController.show);
profileStoreRouter.put('/', profileController.update);

export default profileStoreRouter;
