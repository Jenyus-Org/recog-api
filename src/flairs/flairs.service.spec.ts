import { Test, TestingModule } from "@nestjs/testing";
import { FlairsService } from "./flairs.service";

describe("FlairsService", () => {
  let service: FlairsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlairsService],
    }).compile();

    service = module.get<FlairsService>(FlairsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
