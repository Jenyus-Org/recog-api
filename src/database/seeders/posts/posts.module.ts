import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostToFlair } from "../../../posts/postToFlair.entity";
import { Post } from "../../../posts/post.entity";
import { PostsSeederService } from "./posts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostToFlair])],
  providers: [PostsSeederService],
  exports: [PostsSeederService],
})
export class PostsSeederModule {}
