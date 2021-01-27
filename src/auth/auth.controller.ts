import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { UserDto } from "../users/dto/user.dto";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("/register")
  @ApiCreatedResponse({
    description: "User has been registered.",
    type: UserDto,
  })
  async register(@Body() registerInput: RegisterUserDto) {
    const user = await this.authService.register(
      registerInput.username,
      registerInput.password,
    );
    return new UserDto(user);
  }
}
