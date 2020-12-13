import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// http://localhost:3333/profile
const profileStoreRouter = Router();
const profileController = new ProfileController();

profileStoreRouter.use(ensureAuthenticated);

profileStoreRouter.get('/', profileController.show);
profileStoreRouter.put('/', profileController.update);

export default profileStoreRouter;
