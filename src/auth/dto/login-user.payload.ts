import { Field, ObjectType } from "@nestjs/graphql";
import { UserDto } from "../../users/dto/user.dto";

@ObjectType()
export class LoginUserPayload {
  @Field(() => UserDto)
  user: UserDto;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}