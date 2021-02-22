import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { GqlCurrentUser } from "../auth/gql-current-user.decorator";
import { GqlAuthGuard } from "../auth/guard/gql-auth.guard";
import { UserObject } from "./dto/user.object";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserObject, { nullable: true })
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
      return user;
    }
  }

  @Query(() => UserObject)
  @UseGuards(GqlAuthGuard)
  me(@GqlCurrentUser() user: User) {
    return user;
  }
}
