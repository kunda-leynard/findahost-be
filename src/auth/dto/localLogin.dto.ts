import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LocalLoginDto {
  @ApiProperty({
    description: `The user's registered email`,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `The user's password`,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
