import { ObjectType } from "@nestjs/graphql";
import { LoginUserPayload } from "./login-user.payload";

@ObjectType()
export class RegisterUserPayload extends LoginUserPayload {}
