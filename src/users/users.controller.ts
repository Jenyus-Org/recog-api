import { Controller, Get, Param } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(":username")
  async findOne(@Param("username") username: string) {
    const user = await this.usersService.findOne({ username });
    return user && new UserDto(user);
  }
}
