import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";
import { RegisterUserInput } from "./input/registerUser.input";

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

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

  @Mutation(() => UserDto)
  async register(@Args("input") registerInput: RegisterUserInput) {
    const user = await this.usersService.create(registerInput);
    return new UserDto(user);
  }
}
