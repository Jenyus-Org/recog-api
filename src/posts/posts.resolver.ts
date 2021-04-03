import { HasFields, Selections } from "@jenyus-org/nestjs-graphql-utils";
import { UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { GqlCurrentUser } from "../auth/gql-current-user.decorator";
import { GqlAuthGuard } from "../auth/guard/gql-auth.guard";
import { CommentsService } from "../comments/comments.service";
import { CommentObject } from "../comments/dto/comment.object";
import { FlairObject } from "../flairs/dto/flair.object";
import { FlairsService } from "../flairs/flairs.service";
import { UserObject } from "../users/dto/user.object";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { CreatePostInput } from "./dto/create-post.input";
import { PostObject } from "./dto/post.object";
import { Post } from "./entities/post.entity";
import { PostsService } from "./posts.service";

@Resolver(() => PostObject)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private flairsService: FlairsService,
    private commentsService: CommentsService,
  ) {}

  @Query(() => [PostObject])
  async posts(
    @Selections("posts", ["author", "comments", "comments.author"])
    relations: string[],
    @HasFields("posts.flair") selectFlairs: boolean,
  ) {
    if (selectFlairs) {
      relations = [...relations, "postToFlairs", "postToFlairs.flair"];
    }
    return await this.postsService.findAll({ relations });
  }

  @ResolveField(() => UserObject)
  async author(@Parent() post: Post) {
    if (post.author) {
      return post.author;
    }
    return await this.usersService.findOne({ postId: post.id });
  }

  @ResolveField(() => [FlairObject])
  async flairs(@Parent() post: Post) {
    if (post.postToFlairs && post.postToFlairs.length) {
      return post.postToFlairs.map((postToFlair) => postToFlair.flair);
    }
    return await this.flairsService.findAll({ postId: post.id });
  }

  @ResolveField(() => [CommentObject])
  async comments(@Parent() post: Post) {
    if (post.comments && post.comments.length) {
      return post.comments;
    }
    return await this.commentsService.findAll({ postId: post.id });
  }

  @Mutation(() => PostObject)
  @UseGuards(GqlAuthGuard)
  createPost(
    @GqlCurrentUser() author: User,
    @Args("input") input: CreatePostInput,
  ) {
    return this.postsService.create(author, input);
  }
}
