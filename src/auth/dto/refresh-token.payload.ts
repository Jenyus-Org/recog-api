import { ObjectType, OmitType } from "@nestjs/graphql";
import { LoginUserPayload } from "./login-user.payload";

@ObjectType()
export class RefreshTokenPayload extends OmitType(LoginUserPayload, [
  "refreshToken",
] as const) {}
