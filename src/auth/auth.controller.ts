import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { UserDto } from "../users/dto/user.dto";
import { UsersService } from "../users/users.service";
import { ApiCreatedResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post("/register")
  @ApiCreatedResponse({
    description: "User has been registered.",
    type: UserDto,
  })
  async register(@Body() registerInput: RegisterUserDto) {
    const user = await this.usersService.create(registerInput);
    return new UserDto(user);
  }
}
