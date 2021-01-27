import { Field, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { UserDto } from "../../users/dto/user.dto";

@Exclude()
@ObjectType("RegisterUserPayload")
export class RegisterUserDto {
  @Field(() => UserDto)
  @Expose()
  @ApiProperty()
  user: UserDto;

  @Field()
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Field()
  @Expose()
  @ApiProperty()
  refreshToken: string;
}
