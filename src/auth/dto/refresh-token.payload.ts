import { Field, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { UserDto } from "../../../users/graphql/object/user.object";

@Exclude()
@ObjectType()
export class RefreshTokenPayload {
  @Field(() => UserDto)
  @Expose()
  @ApiProperty()
  user: UserDto;

  @Field()
  @Expose()
  @ApiProperty()
  accessToken: string;
}
