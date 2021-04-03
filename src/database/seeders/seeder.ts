import { Injectable } from "@nestjs/common";
import { CommentsSeederService } from "./comments/comments.service";
import { FlairsSeederService } from "./flairs/flairs.service";
import { PostsSeederService } from "./posts/posts.service";
import { UsersSeederService } from "./users/users.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly usersSeederService: UsersSeederService,
    private readonly postsSeederService: PostsSeederService,
    private readonly flairsSeederService: FlairsSeederService,
    private readonly commentsSeederService: CommentsSeederService,
  ) {}

  async seed() {
    await this.users();
    await this.posts();
    await this.flairs();
    await this.comments();
  }

  async users() {
    await this.usersSeederService.create();
  }

  async posts() {
    await this.postsSeederService.create();
  }

  async flairs() {
    await this.flairsSeederService.create();
  }

  async comments() {
    await this.commentsSeederService.create();
  }
}
