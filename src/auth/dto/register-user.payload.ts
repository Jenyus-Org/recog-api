import { Field, ObjectType } from "@nestjs/graphql";
import { UserObject } from "src/users/dto/user.object";

@ObjectType()
export class RegisterUserPayload {
  @Field(() => UserObject)
  user: UserObject;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
