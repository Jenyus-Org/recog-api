import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { Post } from "./post.entity";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UsersModule)],
  providers: [PostsResolver, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
