import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsSeederModule } from "./comments/comments.module";
import { FlairsSeederModule } from "./flairs/flairs.module";
import { PostsSeederModule } from "./posts/posts.module";
import { Seeder } from "./seeder";
import { UsersSeederModule } from "./users/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersSeederModule,
    PostsSeederModule,
    FlairsSeederModule,
    CommentsSeederModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}
