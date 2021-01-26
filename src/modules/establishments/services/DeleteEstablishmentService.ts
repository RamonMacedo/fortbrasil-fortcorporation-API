import { getRepository } from 'typeorm';

import Establishment from '@modules/establishments/models/Establishments';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';

import AppError from '@shared/errors/AppError';

const diskStorageProvider = new DiskStorageProvider();

export default class DeleteEstablishmentService {
  public async execute(id_establishment: string): Promise<void> {
    const establishmentRepository = getRepository(Establishment);

    const establishment = await establishmentRepository.findOne(
      id_establishment,
    );

    if (!establishment) {
      throw new AppError('Establishment not found', 401);
    }

    if (establishment.avatar) {
      diskStorageProvider.deleteFile(establishment.avatar);
    }

    await establishmentRepository.remove(establishment);
  }
}
