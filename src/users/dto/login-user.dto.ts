import { Field, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { UserDto } from "./user.dto";

@Exclude()
@ObjectType("LoginUserPayload")
export class LoginUserDto {
  @Field(() => UserDto)
  @Expose()
  @ApiProperty()
  user: UserDto;

  @Field()
  @Expose()
  @ApiProperty()
  accessToken: string;
}
