import { HasFields } from "@jenyus-org/nestjs-graphql-utils";
import { ConfigService } from "@nestjs/config";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { AuthService } from "./auth.service";
import { LoginUserInput } from "./dto/login-user.input";
import { LoginUserPayload } from "./dto/login-user.payload";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { RefreshTokenPayload } from "./dto/refresh-token.payload";
import { RegisterUserInput } from "./dto/register-user.input";
import { RegisterUserPayload } from "./dto/register-user.payload";

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Mutation(() => LoginUserPayload)
  async login(
    @Args("input") loginInput: LoginUserInput,
    @HasFields("login.accessToken") generateAccessToken: boolean,
    @HasFields("login.refreshToken") generateRefreshToken: boolean,
    @HasFields("login.accessTokenExpiresAt") getAccessTokenExpiresAt: boolean,
  ) {
    const user = await this.authService.validateUser(
      loginInput.username,
      loginInput.password,
    );

    if (!user) {
      return new UserInputError("Username or password incorrect.");
    }

    const payload = new LoginUserPayload();
    payload.user = user;

    if (generateAccessToken) {
      const accessToken = await this.authService.generateAccessToken(user);
      payload.accessToken = accessToken;
    }

    if (getAccessTokenExpiresAt) {
      const accessTokenExpiresAt = new Date();
      console.log(this.configService.get<number>("auth.jwtKeyExpiresIn"));
      accessTokenExpiresAt.setSeconds(
        accessTokenExpiresAt.getSeconds() +
          this.configService.get<number>("auth.jwtKeyExpiresIn"),
      );
      payload.accessTokenExpiresAt = accessTokenExpiresAt;
      console.log(accessTokenExpiresAt.toLocaleDateString());
    }

    if (generateRefreshToken) {
      const refreshToken = await this.authService.generateRefreshToken(
        user,
        60 * 60 * 24 * 30,
      );
      payload.refreshToken = refreshToken;
    }

    return payload;
  }

  @Mutation(() => RefreshTokenPayload)
  async refreshToken(
    @Args("input") refreshInput: RefreshTokenInput,
    @HasFields("refreshToken.accessTokenExpiresAt")
    getAccessTokenExpiresAt: boolean,
  ) {
    const {
      user,
      token,
    } = await this.authService.createAccessTokenFromRefreshToken(
      refreshInput.refreshToken,
    );

    const payload = new RefreshTokenPayload();
    payload.user = user;
    payload.accessToken = token;

    if (getAccessTokenExpiresAt) {
      const accessTokenExpiresAt = new Date();
      accessTokenExpiresAt.setSeconds(
        accessTokenExpiresAt.getSeconds() +
          this.configService.get<number>("auth.jwtKeyExpiresIn"),
      );
      payload.accessTokenExpiresAt = accessTokenExpiresAt;
    }

    return payload;
  }

  @Mutation(() => RegisterUserPayload)
  async register(
    @Args("input") registerInput: RegisterUserInput,
    @HasFields("register.accessToken") generateAccessToken: boolean,
    @HasFields("register.refreshToken") generateRefreshToken: boolean,
    @HasFields("register.accessTokenExpiresAt")
    getAccessTokenExpiresAt: boolean,
  ) {
    const user = await this.authService.register(
      registerInput.username,
      registerInput.password,
    );

    if (!user) {
      return new UserInputError(
        `User by username ${registerInput.username} already exists.`,
      );
    }

    const payload = new RegisterUserPayload();
    payload.user = user;

    if (generateAccessToken) {
      const accessToken = await this.authService.generateAccessToken(user);
      payload.accessToken = accessToken;
    }

    if (getAccessTokenExpiresAt) {
      const accessTokenExpiresAt = new Date();
      accessTokenExpiresAt.setSeconds(
        accessTokenExpiresAt.getSeconds() +
          this.configService.get<number>("auth.jwtKeyExpiresIn"),
      );
      payload.accessTokenExpiresAt = accessTokenExpiresAt;
    }

    if (generateRefreshToken) {
      const refreshToken = await this.authService.generateRefreshToken(
        user,
        60 * 60 * 24 * 30,
      );
      payload.refreshToken = refreshToken;
    }

    return payload;
  }
}
