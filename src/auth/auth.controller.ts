import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { UserDto } from "../users/dto/user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { LoginUserInput } from "./input/login-user.input";
import { RegisterUserInput } from "./input/register-user.input";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOkResponse({
    description: "User has been logged in.",
    type: LoginUserDto,
  })
  async login(@Request() req, @Body() _: LoginUserInput) {
    const accessToken = await this.authService.generateAccessToken(req.user);
    const refreshToken = await this.authService.generateRefreshToken(
      req.user,
      60 * 60 * 24 * 30,
    );

    const payload = new LoginUserDto();
    payload.user = new UserDto(req.user);
    payload.accessToken = accessToken;
    payload.refreshToken = refreshToken;

    return payload;
  }

  @Post("register")
  @ApiCreatedResponse({
    description: "User has been registered.",
    type: RegisterUserDto,
  })
  async register(@Body() registerInput: RegisterUserInput) {
    const user = await this.authService.register(
      registerInput.username,
      registerInput.password,
    );

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    const payload = new RegisterUserDto();
    payload.user = new UserDto(user);
    payload.accessToken = accessToken;
    payload.refreshToken = refreshToken;

    return payload;
  }
}
