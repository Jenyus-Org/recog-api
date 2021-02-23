import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsModule } from "../comments/comments.module";
import { FlairsModule } from "../flairs/flairs.module";
import { UsersModule } from "../users/users.module";
import { Post } from "./entities/post.entity";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => UsersModule),
    forwardRef(() => FlairsModule),
    forwardRef(() => CommentsModule),
  ],
  providers: [PostsResolver, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
