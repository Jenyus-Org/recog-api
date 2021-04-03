import { Field, ID, ObjectType } from "@nestjs/graphql";

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
}
