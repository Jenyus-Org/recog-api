import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { AuthService } from "../auth/auth.service";
import { CurrentUser } from "../auth/current-user.decorator";
import { GqlAuthGuard } from "../auth/guard/gql-auth.guard";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserDto } from "./dto/user.dto";
import { LoginUserInput } from "./input/login-user.input";
import { RegisterUserInput } from "./input/register-user.input";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
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
    return this.usersService.findOne({ id: user.id });
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
    const { accessToken } = await this.authService.login(user);
    const payload = new LoginUserDto();
    payload.accessToken = accessToken;
    payload.user = new UserDto(user);
    return payload;
  }

  @Mutation(() => UserDto)
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
    return new UserDto(user);
  }
}
