import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flair } from "./flair.entity";
import { FlairsService } from "./flairs.service";
import { FlairsResolver } from './flairs.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Flair])],
  providers: [FlairsService, FlairsResolver],
  exports: [FlairsService],
})
export class FlairsModule {}
