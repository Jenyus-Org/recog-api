import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/posts/entities/post.entity";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";

interface FindAllArgs {
  postId?: number;
  authorId?: number;
}

interface FindOneArgs {
  id: number;
  relations?: string[];
}

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async findAll({ postId, authorId }: FindAllArgs) {
    if (postId) {
      return await this.commentsRepository.find({
        where: {
          parentPost: {
            id: postId,
          },
        },
      });
    } else if (authorId) {
      return await this.commentsRepository.find({
        where: {
          parentPost: {
            id: postId,
          },
        },
      });
    } else {
      throw new Error("One of post ID or author ID must be provided.");
    }
  }

  async findOne({ id, relations }: FindOneArgs) {
    return await this.commentsRepository.findOne(id, { relations });
  }

  async getPost(comment: Comment) {
    let currentComment: Comment = await this.commentsRepository.findOne(
      comment.id,
      {
        relations: ["parentComment", "parentPost"],
      },
    );
    let parentPost: Post = currentComment.parentPost;

    while (!parentPost) {
      currentComment = await this.commentsRepository.findOne(
        currentComment.parentComment.id,
        {
          relations: ["parentComment", "parentPost"],
        },
      );
      parentPost = currentComment.parentPost;
    }

    return parentPost;
  }
}
