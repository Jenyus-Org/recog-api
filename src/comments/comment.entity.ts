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
import { Post } from "src/posts/post.entity";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "author_id" })
  author: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "parent_post_id" })
  parentPost: Post;

  @ManyToOne(() => Comment, (comment) => comment.comments, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "parent_comment_id" })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    cascade: true,
  })
  comments: Comment[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
