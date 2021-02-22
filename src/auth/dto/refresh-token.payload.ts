import { Field, ObjectType } from "@nestjs/graphql";
import { UserObject } from "src/users/dto/user.object";
import { User } from "src/users/user.entity";

@ObjectType()
export class RefreshTokenPayload {
  @Field(() => UserObject)
  user: User;

  @Field()
  accessToken: string;
}
