import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
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
  ],
  providers: [Seeder],
})
export class SeederModule {}
