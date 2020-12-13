import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import storesRouter from '@modules/stores/infra/http/routes/stores.routes';
import sessionsStoreRouter from '@modules/stores/infra/http/routes/session.routes';
import profileStoreRouter from '@modules/stores/infra/http/routes/profile.routes';
import transferRouter from '@modules/transfer/infra/http/routes/transfer.routes';



const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

routes.use('/transfer', transferRouter)

routes.use('/stores', storesRouter);
routes.use('/sessions-store', sessionsStoreRouter);
routes.use('/profile-store', profileStoreRouter);

export default routes;
