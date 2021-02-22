import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../users/user.entity";
import { Repository } from "typeorm";
import { getData } from "./data";

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create() {
    const users = getData();
    for (const user of users) {
      const u = await this.usersRepository.findOne(user.id);
      if (u) {
        continue;
      }
      await this.usersRepository.save(user);
    }
    return true;
  }
}
