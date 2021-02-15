import { Module } from '@nestjs/common';
import { TutorialsController } from './tutorials.controller';
import { TutorialsService } from './tutorials.service';

@Module({
  controllers: [TutorialsController],
})
export class TutorialsModule {}
