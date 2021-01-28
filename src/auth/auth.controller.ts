import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { UserDto } from "../users/dto/user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { LoginUserInput } from "./input/login-user.input";
import { RefreshTokenInput } from "./input/refresh-token.input";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // used for Swagger docs, login logic performed by Password local strategy.
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

  @Post("refresh")
  @ApiOkResponse({
    description: "Generates a new access token.",
  })
  async refresh(@Body() refreshInput: RefreshTokenInput) {
    const {
      user,
      token,
    } = await this.authService.createAccessTokenFromRefreshToken(
      refreshInput.refreshToken,
    );

    const payload = new RefreshTokenDto();
    payload.user = new UserDto(user);
    payload.accessToken = token;

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
