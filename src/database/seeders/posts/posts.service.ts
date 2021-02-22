import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/posts/post.entity";
import { Repository } from "typeorm";
import { getData } from "./data";

@Injectable()
export class PostsSeederService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  async create() {
    const posts = getData();
    for (const post of posts) {
      await this.postsRepository.save(post);
    }
    return true;
  }
}
