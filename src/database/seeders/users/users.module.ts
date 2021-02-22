import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../../users/user.entity";
import { UsersSeederService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersSeederService],
  exports: [UsersSeederService],
})
export class UsersSeederModule {}
