import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class GoogleCallbackDto {
  @IsNotEmpty()
  @IsString()
  googleId: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
