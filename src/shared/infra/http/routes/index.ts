import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import balanceRouter from '@modules/users/infra/http/routes/balance.routes';

import storesRouter from '@modules/stores/infra/http/routes/stores.routes';
import balanceStoreRouter from '@modules/stores/infra/http/routes/balance.routes';
import sessionsStoreRouter from '@modules/stores/infra/http/routes/session.routes';
import profileStoreRouter from '@modules/stores/infra/http/routes/profile.routes';
import transferRouter from '@modules/transfer/infra/http/routes/transfer.routes';
import transferToStoreRouter from '@modules/transfer/infra/http/routes/transfer.user.store.routes';

import pkg from '../../../../../package.json';

const routes = Router();

routes.get('/status', (request, response) => {
  response.status(200).json({
    version: pkg.version,
    node: process.version,
    resource: process.cpuUsage().system,
    uptime_min: Math.floor(process.uptime() / 60),
    server_time: new Date().toISOString().replace('T', ' ').substr(0, 19),
    server_time_moment: new Date().toISOString(),
  });
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

routes.use('/transfer', transferRouter);
routes.use('/transfer-to-store', transferToStoreRouter);
routes.use('/balance', balanceRouter);
routes.use('/balance-store', balanceStoreRouter);

routes.use('/stores', storesRouter);
routes.use('/sessions-store', sessionsStoreRouter);
routes.use('/profile-store', profileStoreRouter);

export default routes;
