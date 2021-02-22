import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("Flair")
export class FlairObject {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly value: string;

  @Field()
  readonly color: string;
}
