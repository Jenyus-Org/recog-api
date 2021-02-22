import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsSeederModule } from "./posts/posts.module";
import { Seeder } from "./seeder";
import { UsersSeederModule } from "./users/users.module";

@Module({
  imports: [UsersSeederModule, PostsSeederModule, TypeOrmModule.forRoot()],
  providers: [Seeder],
})
export class SeederModule {}
