import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { FlairObject } from "./dto/flair.object";
import { Flair } from "./entities/flair.entity";

@Resolver(() => FlairObject)
export class FlairsResolver {
  @ResolveField(() => String)
  colour(@Parent() flair: Flair) {
    return flair.color;
  }
}
