import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(":username")
  @ApiOkResponse({
    description: "Returns the user requested by their username.",
    type: UserDto,
  })
  async findOne(@Param("username") username: string) {
    const user = await this.usersService.findOne({ username });
    return user && new UserDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiOkResponse({
    description: "Returns the logged-in user.",
    type: UserDto,
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
