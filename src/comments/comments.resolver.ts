import { Selections } from "@jenyus-org/nestjs-graphql-utils";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PostObject } from "src/posts/dto/post.object";
import { CommentsService } from "./comments.service";
import { CommentObject } from "./dto/comment.object";
import { Comment } from "./entities/comment.entity";

@Resolver(() => CommentObject)
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}

  @ResolveField(() => PostObject)
  async post(@Parent() comment: Comment) {
    return await this.commentsService.getPost(comment);
  }

  @Query(() => CommentObject)
  async comment(
    @Args("id") id: string,
    @Selections("comment", ["parentPost", "parentComment", "author"])
    relations: string[],
  ) {
    return await this.commentsService.findOne({ id: parseInt(id), relations });
  }
}
