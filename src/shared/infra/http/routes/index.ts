import { Router } from 'express';

import userRoutes from '@modules/users/routes/users.routes';
import profileRoutes from '@modules/users/routes/profileUser.routes';
import sessionsRoutes from '@modules/users/routes/sessions.routes';
import establishmentsRoutes from '@modules/establishments/routes/establishments.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/profile', profileRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/establishments', establishmentsRoutes);

export default routes;
