import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterUserInput } from "../auth/input/register-user.input";
import { User } from "./user.entity";

interface FindOneArgs {
  id?: number;
  username?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne({ id, username }: FindOneArgs) {
    if (id) {
      return await this.usersRepository.findOne(id);
    } else if (username) {
      return await this.usersRepository
        .createQueryBuilder()
        .where("LOWER(username) = LOWER(:username)", { username })
        .getOne();
    } else {
      throw new Error("One of ID or username must be provided.");
    }
  }

  async create(input: RegisterUserInput) {
    const user = this.usersRepository.create(input);
    const res = await this.usersRepository.save(user);
    return res;
  }
}
