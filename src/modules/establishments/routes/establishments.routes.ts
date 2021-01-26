import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ListEstablishmentController from '@modules/establishments/controllers/ListEstablishmentController';
import EstablishmentAvatarController from '@modules/establishments/controllers/EstablishmentAvatarController';
import EstablishmentController from '@modules/establishments/controllers/EstablishmentController';
import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';

const establishmentsRoutes = Router();

const establishmentController = new EstablishmentController();
const establishmentAvatarController = new EstablishmentAvatarController();
const listEstablishmentController = new ListEstablishmentController();

const upload = multer(uploadConfig);

establishmentsRoutes.get(
  '/',
  ensureAuthenticated,
  establishmentController.index,
);

establishmentsRoutes.post(
  '/',
  ensureAuthenticated,
  establishmentController.create,
);

establishmentsRoutes.put(
  '/',
  ensureAuthenticated,
  establishmentController.update,
);

establishmentsRoutes.get(
  '/search',
  ensureAuthenticated,
  listEstablishmentController.getByLocation,
);

establishmentsRoutes.get(
  '/:id',
  ensureAuthenticated,
  establishmentController.show,
);

establishmentsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  establishmentController.delete,
);

establishmentsRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  establishmentAvatarController.update,
);

establishmentsRoutes.get(
  '/search/:description',
  ensureAuthenticated,
  listEstablishmentController.getByDescription,
);

export default establishmentsRoutes;
