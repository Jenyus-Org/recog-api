import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flair } from "src/flairs/entities/flair.entity";
import { FlairsSeederService } from "./flairs.service";

@Module({
  imports: [TypeOrmModule.forFeature([Flair])],
  providers: [FlairsSeederService],
  exports: [FlairsSeederService],
})
export class FlairsSeederModule {}
