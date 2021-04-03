import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Flair } from "./entities/flair.entity";

interface FindAllArgs {
  postId?: number;
}

@Injectable()
export class FlairsService {
  constructor(
    @InjectRepository(Flair) private flairsRepository: Repository<Flair>,
  ) {}

  async findAll({ postId }: FindAllArgs) {
    return await this.flairsRepository.find({
      join: {
        alias: "flairs",
        innerJoin: { postToFlairs: "flairs.postToFlairs" },
      },
      where: (qb) => {
        qb.where("postToFlairs.post_id = :postId", { postId });
      },
    });
  }
}
