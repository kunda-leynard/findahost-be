import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LocalRegisterDto {
  @ApiProperty({
    description: `The user's first name`,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: `The user's last name`,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: `The user's mobile number`,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  mobile: string;

  @ApiProperty({
    description: `The user's email`,
    example: 'example@gmail.com',
    minLength: 5,
    maxLength: 255,
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
  @Length(6, 35)
  @IsString()
  password: string;

  @ApiProperty({
    description: `The user's confirm password`,
    type: String,
  })
  @Length(6, 35)
  @IsString()
  confirmPassword: string;
}
