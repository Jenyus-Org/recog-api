import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class LoginUserInput {
  @Field()
  @ApiProperty()
  username: string;

  @Field()
  @ApiProperty()
  password: string;
}
