import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
