import { Test, TestingModule } from '@nestjs/testing';
import { TutorialsService } from './tutorials.service';

describe('TutorialsService', () => {
  let service: TutorialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorialsService],
    }).compile();

    service = module.get<TutorialsService>(TutorialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
