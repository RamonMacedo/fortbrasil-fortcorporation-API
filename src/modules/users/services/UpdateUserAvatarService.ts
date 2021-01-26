import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import S3StorageProvider from '@shared/providers/StorageProvider/implementations/S3StorageProvider';

import User from '@modules/users/models/Users';

interface Request {
  user_id: string;
  avatarFilename: string;
}

const s3StorageProvider = new S3StorageProvider();

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can be change avatar!', 401);
    }

    if (user.avatar) {
      await s3StorageProvider.deleteFile({
        file: user.avatar,
        typeBucket: 'users',
      });
    }

    const filename = await s3StorageProvider.saveFile({
      file: avatarFilename,
      typeBucket: 'users',
      newName: user_id,
    });

    user.avatar = filename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
