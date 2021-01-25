import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello() {
    return "Hi.";
  }
}
