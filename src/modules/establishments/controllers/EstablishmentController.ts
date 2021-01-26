import { Request, Response } from 'express';

import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import UpdateEstablishmentService from '@modules/establishments/services/UpdateEstablishmentService';
import DeleteEstablishmentService from '@modules/establishments/services/DeleteEstablishmentService';
import ShowEstablishmentService from '@modules/establishments/services/ShowEstablishmentService';
import ListEstablishmentService from '@modules/establishments/services/ListEstablishmentService';

import { classToClass } from 'class-transformer';

export default class EstablishmentController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 15 } = req.query;

    const listEstablishment = new ListEstablishmentService();

    const establishments = await listEstablishment.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return res.json(classToClass(establishments));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showEstablishment = new ShowEstablishmentService();

    const establishment = await showEstablishment.execute(id);

    return res.json(classToClass(establishment));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      estab_name,
      fantasy_name,
      description,
      cnpj,
      zipcode,
      address,
      city,
      state,
    } = req.body;

    const createMarket = new CreateEstablishmentService();

    const market = await createMarket.execute({
      estab_name,
      fantasy_name,
      description,
      cnpj,
      zipcode,
      address,
      city,
      state,
    });

    return res.json(classToClass(market));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      id_establishment,
      estab_name,
      fantasy_name,
      description,
      cnpj,
      zipcode,
      address,
      city,
      state,
    } = req.body;

    const updateEstablishment = new UpdateEstablishmentService();

    const market = await updateEstablishment.execute({
      id_establishment,
      estab_name,
      fantasy_name,
      description,
      cnpj,
      zipcode,
      address,
      city,
      state,
    });

    return res.json(classToClass(market));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteEstablishment = new DeleteEstablishmentService();

    await deleteEstablishment.execute(id);

    return res.status(204).send();
  }
}
