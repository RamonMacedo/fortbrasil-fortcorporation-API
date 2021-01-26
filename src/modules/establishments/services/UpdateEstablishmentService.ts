import { getRepository } from 'typeorm';

import Establishment from '@modules/establishments/models/Establishments';
import AppError from '@shared/errors/AppError';

import IUpdateEstablishmentDTO from '@modules/establishments/dtos/IUpdateEstablishmentDTO';

export default class UpdateEstablishmentService {
  public async execute({
    id_establishment,
    estab_name,
    fantasy_name,
    description,
    cnpj,
    zipcode,
    address,
    city,
    state,
  }: IUpdateEstablishmentDTO): Promise<Establishment> {
    const establishmentRepository = getRepository(Establishment);

    const establishment = await establishmentRepository.findOne(
      id_establishment,
    );

    if (!establishment) {
      throw new AppError('Establishment not found', 401);
    }

    establishment.estab_name = estab_name;
    establishment.fantasy_name = fantasy_name;
    establishment.description = description;
    establishment.address = address;
    establishment.cnpj = cnpj;
    establishment.zipcode = zipcode;
    establishment.city = city;
    establishment.state = state;

    await establishmentRepository.save(establishment);

    return establishment;
  }
}
