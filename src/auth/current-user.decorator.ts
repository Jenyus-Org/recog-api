import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/users/user.entity";

export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  User
>((data, context) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});
