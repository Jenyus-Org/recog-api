import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Flair } from "../../../flairs/entities/flair.entity";
import { Repository } from "typeorm";
import { getData } from "./data";

@Injectable()
export class FlairsSeederService {
  constructor(
    @InjectRepository(Flair)
    private readonly flairsRepository: Repository<Flair>,
  ) {}

  async create() {
    const flairs = getData();
    for (const flair of flairs) {
      const f = await this.flairsRepository.findOne(flair.id);
      if (f) {
        continue;
      }
      await this.flairsRepository.save(flair);
    }
  }
}
