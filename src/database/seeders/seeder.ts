import { Injectable } from "@nestjs/common";
import { FlairsSeederService } from "./flairs/flairs.service";
import { PostsSeederService } from "./posts/posts.service";
import { UsersSeederService } from "./users/users.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly usersSeederService: UsersSeederService,
    private readonly postsSeederService: PostsSeederService,
    private readonly flairsSeederService: FlairsSeederService,
  ) {}

  async seed() {
    // await this.users();
    // await this.posts();
    await this.flairs();
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
}
