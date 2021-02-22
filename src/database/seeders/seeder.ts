import { Injectable } from "@nestjs/common";
import { PostsSeederService } from "./posts/posts.service";
import { UsersSeederService } from "./users/users.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly usersSeederService: UsersSeederService,
    private readonly postsSeederService: PostsSeederService,
  ) {}

  async seed() {
    await this.users();
    // await this.posts();
  }

  async users() {
    await this.usersSeederService.create();
  }

  async posts() {
    await this.postsSeederService.create();
  }
}
