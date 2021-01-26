import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UserController from '@modules/users/controllers/UserController';
import UserAvatarController from '@modules/users/controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';

const usersRoutes = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRoutes.post('/', userController.create);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRoutes;
