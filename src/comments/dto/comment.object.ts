import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("Comment")
export class CommentObject {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly body: string;
}
