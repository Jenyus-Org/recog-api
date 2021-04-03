import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, ObjectLiteral, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { CreatePostInput } from "./dto/create-post.input";
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

  create(author: User, input: CreatePostInput) {
    const post = this.postsRepository.create({ author, ...input });
    return this, this.postsRepository.save(post);
  }
}
