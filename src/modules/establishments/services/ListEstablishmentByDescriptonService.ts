import { getRepository } from 'typeorm';

import Establishment from '@modules/establishments/models/Establishments';
import AppError from '@shared/errors/AppError';

interface Response {
  establishments: Establishment[];
  count: number;
  totalPage: number;
}

interface Request {
  page: number;
  limit: number;
  description: string;
}
export default class ListEstablishmentByDescriptonService {
  public async execute({
    page,
    limit: range,
    description,
  }: Request): Promise<Response> {
    const establishmentRepository = getRepository(Establishment);

    const establishment = await establishmentRepository
      .createQueryBuilder('establishments')
      .where('LOWER(establishments.estab_name) like LOWER(:description)', {
        description: `%${description}%`,
      })
      .orWhere('LOWER(establishments.fantasy_name) like LOWER(:description)', {
        description: `%${description}%`,
      })
      .limit(range)
      .offset((page - 1) * range)
      .getManyAndCount();

    if (!establishment) {
      throw new AppError('Establishment not found', 401);
    }

    const totalPage = Math.ceil(establishment[1] / Number(range));

    const res: Response = {
      establishments: establishment[0],
      count: establishment[1],
      totalPage,
    };

    return res;
  }
}
