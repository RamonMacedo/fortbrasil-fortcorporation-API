import { Router } from 'express';

import ProfileUserController from '../controllers/ProfileUserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileUserRouter = Router();
const profileUserController = new ProfileUserController();

profileUserRouter.get('/', ensureAuthenticated, profileUserController.show);
profileUserRouter.put('/', ensureAuthenticated, profileUserController.update);

export default profileUserRouter;
