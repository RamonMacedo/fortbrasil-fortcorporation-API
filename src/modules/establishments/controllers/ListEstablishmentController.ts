import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import ListEstablishmentByDescriptonService from '../services/ListEstablishmentByDescriptonService';
import ListEstablishmentByLocationService from '../services/ListEstablishmentByLocationService';

export default class ListEstablishmentController {
  public async getByDescription(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { page = 1, limit = 15 } = req.query;
    const { description } = req.params;

    const listEstablishment = new ListEstablishmentByDescriptonService();

    const establishment = await listEstablishment.execute({
      page: Number(page),
      limit: Number(limit),
      description,
    });

    return res.json(classToClass(establishment));
  }

  public async getByLocation(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 15, state, city } = req.query;

    const listEstablishment = new ListEstablishmentByLocationService();

    const establishment = await listEstablishment.execute({
      page: Number(page),
      limit: Number(limit),
      state: state ? String(state) : null,
      city: city ? String(city) : null,
    });

    return res.json(classToClass(establishment));
  }
}
