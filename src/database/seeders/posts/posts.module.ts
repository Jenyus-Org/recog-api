import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../../../posts/post.entity";
import { PostsSeederService } from "./posts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsSeederService],
  exports: [PostsSeederService],
})
export class PostsSeederModule {}
