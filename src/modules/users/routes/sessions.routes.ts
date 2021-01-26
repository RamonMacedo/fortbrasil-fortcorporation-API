import { Router } from 'express';

import SessionsUserController from '../controllers/SessionsUserController';

const sessionsRouter = Router();

const sessionsUserController = new SessionsUserController();

sessionsRouter.post('/users', sessionsUserController.create);

export default sessionsRouter;
