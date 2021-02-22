import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flair } from "./flair.entity";
import { FlairsService } from "./flairs.service";

@Module({
  imports: [TypeOrmModule.forFeature([Flair])],
  providers: [FlairsService],
  exports: [FlairsService],
})
export class FlairsModule {}
