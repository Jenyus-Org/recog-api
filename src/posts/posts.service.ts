import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, ObjectLiteral, Repository } from "typeorm";
import { Post } from "./post.entity";

interface FindAllArgs {
  relations?: string[];
  authorId?: number;
}

interface FindOneArgs extends FindAllArgs {
  id: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll({ relations, authorId }: FindAllArgs) {
    let where: ObjectLiteral | FindConditions<Post> = {};
    if (authorId) {
      where = { ...where, author: { id: authorId } };
    }
    return await this.postsRepository.find({ relations, where });
  }

  async findOne({ id, relations }: FindOneArgs) {
    return await this.postsRepository.findOne(id, { relations });
  }
}
