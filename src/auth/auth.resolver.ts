import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { GqlAuthGuard } from "./guard/gql-auth.guard";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserDto } from "../users/dto/user.dto";
import { LoginUserInput } from "./input/login-user.input";
import { RegisterUserInput } from "./input/register-user.input";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RefreshTokenInput } from "./input/refresh-token.input";

@Resolver()
export class AuthResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Query(() => UserDto, { nullable: true })
  async user(
    @Args("id", { nullable: true }) id: string,
    @Args("username", { nullable: true }) username?: string,
  ) {
    if (!id && !username) {
      throw new UserInputError("Arguments must be one of ID or username.");
    } else {
      const user = await this.usersService.findOne({
        id: id && parseInt(id),
        username,
      });
      return user && new UserDto(user);
    }
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => LoginUserDto)
  async login(@Args("input") loginInput: LoginUserInput) {
    const user = await this.authService.validateUser(
      loginInput.username,
      loginInput.password,
    );

    if (!user) {
      return new UserInputError("Username or password incorrect.");
    }

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    const payload = new LoginUserDto();
    payload.user = new UserDto(user);
    payload.accessToken = accessToken;
    payload.refreshToken = refreshToken;

    return payload;
  }

  @Mutation(() => RefreshTokenDto)
  async refreshToken(@Args("input") refreshInput: RefreshTokenInput) {
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

  @Mutation(() => RegisterUserDto)
  async register(@Args("input") registerInput: RegisterUserInput) {
    const user = await this.authService.register(
      registerInput.username,
      registerInput.password,
    );

    if (!user) {
      return new UserInputError(
        `User by username ${registerInput.username} already exists.`,
      );
    }

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
