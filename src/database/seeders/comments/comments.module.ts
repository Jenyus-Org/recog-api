import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "../../../comments/entities/comment.entity";
import { CommentsSeederService } from "./comments.service";

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsSeederService],
  exports: [CommentsSeederService],
})
export class CommentsSeederModule {}
