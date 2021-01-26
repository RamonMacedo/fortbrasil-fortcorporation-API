import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateEstablishmentAvatarService from '@modules/establishments/services/UpdateEstablishmentAvatarService';

export default class EstablishmentAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id_establishment } = req.body;

    const updateEstablishmentAvatarService = new UpdateEstablishmentAvatarService();

    const establishment = await updateEstablishmentAvatarService.execute({
      id_establishment,
      avatarFilename: req.file.filename,
    });

    return res.json(classToClass(establishment));
  }
}
