import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class RefreshTokenInput {
  @Field()
  @ApiProperty()
  refreshToken: string;
}
