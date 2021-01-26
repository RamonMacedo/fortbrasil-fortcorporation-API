import { getRepository } from 'typeorm';

import Establishment from '@modules/establishments/models/Establishments';
import AppError from '@shared/errors/AppError';

import S3StorageProvider from '@shared/providers/StorageProvider/implementations/S3StorageProvider';

interface Request {
  id_establishment: string;
  avatarFilename: string;
}

const s3StorageProvider = new S3StorageProvider();

export default class UpdateEstablishmentAvatarService {
  public async execute({
    id_establishment,
    avatarFilename,
  }: Request): Promise<Establishment> {
    const establishmentRepository = getRepository(Establishment);

    const establishment = await establishmentRepository.findOne(
      id_establishment,
    );

    if (!establishment) {
      throw new AppError('Establishment not found', 401);
    }

    if (establishment.avatar) {
      await s3StorageProvider.deleteFile({
        file: establishment.avatar,
        typeBucket: 'establishments',
      });
    }

    const filename = await s3StorageProvider.saveFile({
      file: avatarFilename,
      typeBucket: 'establishments',
      newName: id_establishment,
    });

    establishment.avatar = filename;

    await establishmentRepository.save(establishment);

    return establishment;
  }
}
