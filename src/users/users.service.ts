import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

interface FindOneArgs {
  id?: number;
  username?: string;
  relations?: string[];
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne({ id, username, relations }: FindOneArgs) {
    if (id) {
      return await this.usersRepository.findOne(id, { relations });
    } else if (username) {
      return await this.usersRepository
        .createQueryBuilder()
        .where("LOWER(username) = LOWER(:username)", { username })
        .getOne();
    } else {
      throw new Error("One of ID or username must be provided.");
    }
  }

  async create(input: Partial<User>) {
    const user = this.usersRepository.create(input);
    const res = await this.usersRepository.save(user);
    return res;
  }
}
