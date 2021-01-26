import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "src/users/dto/registerUser.dto";
import { UserDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";

@Controller("auth")
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post("/register")
  async register(@Body() registerInput: RegisterUserDto) {
    const user = await this.usersService.create(registerInput);
    return new UserDto(user);
  }
}
