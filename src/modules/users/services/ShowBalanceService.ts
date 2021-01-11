import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowBalanceService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<number> {
    const user = await this.usersRepository.findById(user_id);

    console.log(user);

    if (!user) {
      throw new AppError('Usuário não existe');
    }

    return user.account.balance;
  }
}

export default ShowBalanceService;
