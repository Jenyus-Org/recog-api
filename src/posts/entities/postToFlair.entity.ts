import { Flair } from "../../flairs/entities/flair.entity";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";

@Entity({ name: "posts_flairs" })
export class PostToFlair {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.postToFlairs)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @ManyToOne(() => Flair, (flair) => flair.postToFlairs)
  @JoinColumn({ name: "flair_id" })
  flair: Flair;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
