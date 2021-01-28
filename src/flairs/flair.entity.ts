import { PostToFlair } from "../posts/postToFlair.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "flairs" })
export class Flair {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  color: string;

  @OneToMany(() => PostToFlair, (postToFlair) => postToFlair.flair)
  postToFlairs: PostToFlair[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
