import { Test, TestingModule } from "@nestjs/testing";
import { FlairsResolver } from "./flairs.resolver";

describe("FlairsResolver", () => {
  let resolver: FlairsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlairsResolver],
    }).compile();

    resolver = module.get<FlairsResolver>(FlairsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
