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
  state: string | null;
  city: string | null;
}
export default class ListEstablishmentByLocationService {
  public async execute({
    page,
    limit: range,
    state,
    city,
  }: Request): Promise<Response> {
    const establishmentRepository = getRepository(Establishment);

    let establishment: [Establishment[], number];

    if (state && city) {
      const findStateAndCity = await establishmentRepository
        .createQueryBuilder('establishments')
        .where('LOWER(establishments.state) like LOWER(:state)', {
          state: `%${state}%`,
        })
        .andWhere('LOWER(establishments.city) like LOWER(:city)', {
          city: `%${city}%`,
        })
        .limit(range)
        .offset((page - 1) * range)
        .getManyAndCount();

      establishment = findStateAndCity;
    } else if (state && !city) {
      const findState = await establishmentRepository
        .createQueryBuilder('establishments')
        .where('LOWER(establishments.state) like LOWER(:state)', {
          state: `%${state}%`,
        })
        .limit(range)
        .offset((page - 1) * range)
        .getManyAndCount();

      establishment = findState;
    } else if (!state && city) {
      const findCity = await establishmentRepository
        .createQueryBuilder('establishments')
        .where('LOWER(establishments.city) like LOWER(:city)', {
          city: `%${city}%`,
        })
        .limit(range)
        .offset((page - 1) * range)
        .getManyAndCount();

      establishment = findCity;
    } else {
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
