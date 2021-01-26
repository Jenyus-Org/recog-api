import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
  @ApiProperty()
  username: string;
  
  @ApiProperty()
  password: string;
}
