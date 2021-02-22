import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PostObject } from "../../posts/dto/post.object";
import { Post } from "../../posts/post.entity";

@ObjectType("User")
export class UserObject {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly username: string;

  @Field({ nullable: true })
  readonly firstName: string;

  @Field({ nullable: true })
  readonly lastName: string;

  @Field(() => [PostObject])
  readonly posts: Post[];
}
