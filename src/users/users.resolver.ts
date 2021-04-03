import { Selections } from "@jenyus-org/nestjs-graphql-utils";
import { UseGuards } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { PostObject } from "../posts/dto/post.object";
import { PostsService } from "../posts/posts.service";
import { GqlCurrentUser } from "../auth/gql-current-user.decorator";
import { GqlAuthGuard } from "../auth/guard/gql-auth.guard";
import { UserObject } from "./dto/user.object";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => UserObject)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query(() => UserObject, { nullable: true })
  async user(
    @Selections("user", ["posts"]) relations: string[],
    @Args("id", { nullable: true }) id?: string,
    @Args("username", { nullable: true }) username?: string,
  ) {
    if (!id && !username) {
      throw new UserInputError("Arguments must be one of ID or username.");
    } else {
      const user = await this.usersService.findOne({
        id: id && parseInt(id),
        username,
        relations,
      });
      return user;
    }
  }

  @Query(() => UserObject)
  @UseGuards(GqlAuthGuard)
  me(@GqlCurrentUser() user: User) {
    return user;
  }

  @ResolveField(() => [PostObject])
  async posts(@Parent() user: User) {
    if (user.posts && user.posts.length) {
      return user.posts;
    }
    const { id } = user;
    return this.postsService.findAll({ authorId: id });
  }
}
