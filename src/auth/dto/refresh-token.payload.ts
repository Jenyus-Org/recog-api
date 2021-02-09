import { Field, ObjectType } from "@nestjs/graphql";
import { UserObject } from "src/users/dto/user.object";

@ObjectType()
export class RefreshTokenPayload {
  @Field(() => UserObject)
  user: UserObject;

  @Field()
  accessToken: string;
}
