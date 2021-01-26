import { getRepository } from 'typeorm';

import User from '@modules/users/models/Users';
import AppError from '@shared/errors/AppError';

import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import { hash } from 'bcryptjs';

export default class UpdateProfileUserService {
  public async execute({
    id_user,
    name,
    email,
    password,
  }: IUpdateUserDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id_user);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const userEmail = await userRepository.findOne({ where: { email } });

    if (userEmail && userEmail.id !== id_user) {
      throw new AppError('Email address already used', 401);
    }

    user.email = email;
    user.name = name;

    if (password) {
      const passwordHashed = await hash(password, 8);

      if (user.password !== password) {
        user.password = passwordHashed;
      }
    }

    await userRepository.save(user);

    return user;
  }
}
