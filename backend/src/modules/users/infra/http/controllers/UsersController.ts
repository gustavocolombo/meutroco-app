import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateAccountService from '@modules/accounts/services/CreateAccountPersonalService';
import { TypeAccount } from '@modules/accounts/infra/typeorm/entities/Account';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { document, password, name, phone, birthday } = req.body;

    try {
      const createUser = container.resolve(CreateUserService);
      const createAccount = container.resolve(CreateAccountService);

      const user = await createUser.execute({
        document,
        password,
        name,
        phone,
        birthday,
      });

      const account = await createAccount.execute({
        type: TypeAccount.PERSONAL,
        user: user
      })

      // delete user.password;
      Object.assign(user, { password: undefined });

      return res.json({ user, account });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
