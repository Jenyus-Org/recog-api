import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne({ username });
    if (user) {
      const { password, ...result } = user;
      const match = await bcrypt.compare(pass, password);
      if (match) {
        return result;
      }
    }
    return null;
  }

  async login(user: Partial<User>) {
    const payload = { username: user.username, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(username: string, pass: string) {
    let user = await this.usersService.findOne({ username });
    if (user) {
      return null;
    }
    const hashed = await bcrypt.hash(pass, 10);
    user = await this.usersService.create({ username, password: hashed });
    return user;
  }
}
