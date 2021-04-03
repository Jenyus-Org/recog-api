import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, ObjectLiteral, Repository } from "typeorm";
import { Post } from "./entities/post.entity";

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

  findAll({ relations, authorId }: FindAllArgs) {
    let where: ObjectLiteral | FindConditions<Post> = {};
    if (authorId) {
      where = { ...where, author: { id: authorId } };
    }
    return this.postsRepository.find({ relations, where });
  }

  findOne({ id, relations }: FindOneArgs) {
    return this.postsRepository.findOne(id, { relations });
  }
  }
}
