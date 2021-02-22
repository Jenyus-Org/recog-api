import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "../users/user.entity";

export const GqlCurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  User
>((data, context) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});
