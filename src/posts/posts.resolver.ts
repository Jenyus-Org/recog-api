import { HasFields, Selections } from "@jenyus-org/nestjs-graphql-utils";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { FlairsService } from "src/flairs/flairs.service";
import { UsersService } from "src/users/users.service";
import { PostObject } from "./dto/post.object";
import { Post } from "./post.entity";
import { PostsService } from "./posts.service";

@Resolver(() => PostObject)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private flairsService: FlairsService,
  ) {}

  @Query(() => [PostObject])
  async posts(
    @Selections("posts", ["author"]) relations: string[],
    @HasFields("posts.flair") selectFlairs: boolean,
  ) {
    if (selectFlairs) {
      relations = [...relations, "postToFlairs", "postToFlairs.flair"];
    }
    return await this.postsService.findAll({ relations });
  }

  @ResolveField()
  async author(@Parent() post: Post) {
    if (post.author) {
      return post.author;
    }
    return await this.usersService.findOne({ postId: post.id });
  }

  @ResolveField()
  async flairs(@Parent() post: Post) {
    if (post.postToFlairs) {
      return post.postToFlairs.map((postToFlair) => postToFlair.flair);
    }
    return await this.flairsService.findAll({ postId: post.id });
  }
}
