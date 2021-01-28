import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty()
  readonly id: string;

  @Field()
  @Expose()
  @ApiProperty()
  readonly username: string;

  @Field({ nullable: true })
  @Expose()
  @ApiProperty()
  readonly firstName: string;

  @Field({ nullable: true })
  @Expose()
  @ApiProperty()
  readonly lastName: string;
}
