import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController],
  imports: [UsersModule],
})
export class AuthModule {}
