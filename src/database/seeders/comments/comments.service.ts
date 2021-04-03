import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../../../comments/entities/comment.entity";
import { getData } from "./data";

@Injectable()
export class CommentsSeederService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async create() {
    const comments = getData();
    for (const comment of comments) {
      const c = await this.commentsRepository.findOne(comment.id);
      if (c) {
        continue;
      }
      await this.commentsRepository.save(comment);
    }
  }
}
