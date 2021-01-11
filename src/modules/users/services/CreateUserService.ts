import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  document: string;
  password: string;
  name: string;
  phone: string;
  account: Account;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    document,
    password,
    name,
    phone,
    account,
  }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.findByDocument(document);
    if (checkUserExist) {
      throw new AppError('Document has been used!!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      document,
      password: hashedPassword,
      name,
      phone,
      account,
    });

    return user;
  }
}

export default CreateUserService;
