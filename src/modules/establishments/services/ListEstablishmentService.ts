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
}

export default class ListEstablishmentService {
  public async execute({ page, limit: range }: Request): Promise<Response> {
    const establishmentRepository = getRepository(Establishment);

    const establishment = await establishmentRepository.findAndCount({
      take: range,
      skip: (page - 1) * range,
      order: { estab_name: 'ASC' },
    });

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
