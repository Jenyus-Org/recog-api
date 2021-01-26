import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dto/registerUser.dto";
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

  @Post("/register")
  async register(@Body() registerInput: RegisterUserDto) {
    const user = await this.usersService.create(registerInput);
    return new UserDto(user);
  }
}
