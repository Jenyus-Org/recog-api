import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";

interface FindAllArgs {
  postId?: number;
  authorId?: number;
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
}
