import { Selections } from "@jenyus-org/nestjs-graphql-utils";
import { Query, Resolver } from "@nestjs/graphql";
import { PostObject } from "./dto/post.object";
import { PostsService } from "./posts.service";

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [PostObject])
  async posts(@Selections("posts", ["author"]) relations: string[]) {
    return await this.postsService.findAll({ relations });
  }
}
