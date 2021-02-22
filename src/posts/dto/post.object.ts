import { Field, ID, ObjectType } from "@nestjs/graphql";
import { FlairObject } from "../../flairs/dto/flair.object";
import { Flair } from "../../flairs/flair.entity";
import { UserObject } from "../../users/dto/user.object";
import { User } from "../../users/user.entity";

@ObjectType("Post")
export class PostObject {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly title: string;

  @Field()
  readonly body: string;

  @Field(() => UserObject)
  readonly author: User;

  @Field(() => [FlairObject])
  readonly flairs: Flair[];
}
