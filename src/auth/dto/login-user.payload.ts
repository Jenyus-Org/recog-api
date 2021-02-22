import { Field, ObjectType } from "@nestjs/graphql";
import { UserObject } from "../../users/dto/user.object";
import { User } from "../../users/user.entity";

@ObjectType()
export class LoginUserPayload {
  @Field(() => UserObject)
  user: User;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
