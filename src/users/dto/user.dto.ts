import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Exclude, Expose } from "class-transformer";
import { User } from "../user.entity";

@Exclude()
@ObjectType("User")
export class UserDto {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @Field(() => ID)
  @Expose()
  readonly id: string;

  @Field()
  @Expose()
  readonly username: string;

  @Field()
  @Expose()
  readonly firstName: string;

  @Field()
  @Expose()
  readonly lastName: string;
}
