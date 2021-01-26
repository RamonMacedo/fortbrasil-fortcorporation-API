import { getRepository } from 'typeorm';

import User from '@modules/users/models/Users';
import AppError from '@shared/errors/AppError';

export default class ShowProfileUserService {
  public async execute(id_user: string): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id_user);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    return user;
  }
}
