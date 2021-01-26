import { getRepository } from 'typeorm';

import Establishment from '@modules/establishments/models/Establishments';
import AppError from '@shared/errors/AppError';

export default class ShowEstablishmentService {
  public async execute(id_establishment: string): Promise<Establishment> {
    const establishmentRepository = getRepository(Establishment);

    const establishment = await establishmentRepository.findOne(
      id_establishment,
    );

    if (!establishment) {
      throw new AppError('Establishment not found', 401);
    }

    return establishment;
  }
}
