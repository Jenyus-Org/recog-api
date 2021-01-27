import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class RegisterUserInput {
  @Field()
  @ApiProperty()
  username: string;

  @Field()
  @ApiProperty()
  password: string;
}
