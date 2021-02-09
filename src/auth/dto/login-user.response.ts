import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { UserDto } from "../../users/dto/user.dto";

@Exclude()
export class LoginUserResponse {
  @Expose()
  @ApiProperty()
  user: UserDto;

  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;
}
