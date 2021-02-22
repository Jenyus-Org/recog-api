import { Selections } from "@jenyus-org/nestjs-graphql-utils";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UsersService } from "src/users/users.service";
import { PostObject } from "./dto/post.object";
import { PostsService } from "./posts.service";

@Resolver(() => PostObject)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Query(() => [PostObject])
  async posts(@Selections("posts", ["author"]) relations: string[]) {
    return await this.postsService.findAll({ relations });
  }

  @ResolveField()
  async author(@Parent() post: PostObject) {
    if (post.author) {
      return post.author;
    }
    return await this.usersService.findOne({ postId: parseInt(post.id) });
  }
}
