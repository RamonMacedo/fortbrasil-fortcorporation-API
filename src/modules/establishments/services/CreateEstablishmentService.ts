import { getRepository } from 'typeorm';

import Establishment from '@modules/establishments/models/Establishments';

import AppError from '@shared/errors/AppError';
import ICreateEstablishmentDTO from '../dtos/ICreateEstablishmentDTO';

export default class CreateEstablishmentService {
  public async execute({
    estab_name,
    fantasy_name,
    description,
    cnpj,
    zipcode,
    address,
    city,
    state,
  }: ICreateEstablishmentDTO): Promise<Establishment> {
    const establishmentRepository = getRepository(Establishment);

    const checkEstablishment = await establishmentRepository.findOne({
      where: { cnpj },
    });

    if (checkEstablishment) {
      throw new AppError('Establishment already exists', 401);
    }

    const establishment = establishmentRepository.create({
      estab_name,
      fantasy_name,
      description,
      cnpj,
      zipcode,
      address,
      city,
      state,
    });

    await establishmentRepository.save(establishment);

    return establishment;
  }
}
