import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../../posts/post.entity";
import { Repository } from "typeorm";
import { getData } from "./data";
import { PostToFlair } from "src/posts/postToFlair.entity";

@Injectable()
export class PostsSeederService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(PostToFlair)
    private readonly postToFlairsRepository: Repository<PostToFlair>,
  ) {}

  async create() {
    const posts = getData();
    for (const post of posts) {
      const p = await this.postsRepository.save(post);
      for (const postToFlair of post.postToFlairs) {
        const f = await this.postToFlairsRepository.findOne({
          post: { id: p.id },
          flair: { id: postToFlair.flair.id },
        });
        if (f) {
          continue;
        }
        await this.postToFlairsRepository.save({
          post: { id: p.id },
          flair: { id: postToFlair.flair.id },
        });
      }
    }
    return true;
  }
}
