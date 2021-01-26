import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
// import path from 'path';

import User from '@modules/users/models/Users';
import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUser = await userRepository.findOne({ where: { email } });

    if (checkUser) {
      throw new AppError('Email address already used', 401);
    }

    const passwordHashed = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    await userRepository.save(user);

    return user;
  }
}
