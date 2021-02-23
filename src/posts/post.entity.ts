import { User } from "../users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PostToFlair } from "./postToFlair.entity";
import { Comment } from "../comments/comment.entity";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "author_id" })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.parentPost, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => PostToFlair, (postToFlair) => postToFlair.post)
  postToFlairs: PostToFlair[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
