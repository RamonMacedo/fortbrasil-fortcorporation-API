import { Request, Response } from 'express';

import UpdateProfileUserService from '@modules/users/services/UpdateProfileUserService';
import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';
import { classToClass } from 'class-transformer';

export default class ProfileUserController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showProfileUser = new ShowProfileUserService();

    const user = await showProfileUser.execute(id);

    return res.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const id_user = request.user.id;

    const updateUser = new UpdateProfileUserService();

    const user = await updateUser.execute({
      id_user,
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
