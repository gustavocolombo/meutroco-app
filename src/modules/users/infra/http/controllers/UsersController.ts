import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateAccountService from '@modules/accounts/services/CreateAccountService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { document, password, name, phone } = req.body;

    try {
      const createUser = container.resolve(CreateUserService);
      const createAccount = container.resolve(CreateAccountService);

      const account = await createAccount.execute();

      const user = await createUser.execute({
        document,
        password,
        name,
        phone,
        account,
      });

      // delete user.password;
      Object.assign(user, { password: undefined });

      return res.json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
