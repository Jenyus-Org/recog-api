import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("Post")
export class PostObject {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly title: string;

  @Field()
  readonly body: string;
}
