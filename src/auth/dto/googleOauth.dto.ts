import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class GoogleOauthDto {
  @ApiProperty({
    description: 'The access token coming from google',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: 'The token expiry coming from google',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsNumber()
  expiresIn: string;

  @ApiProperty({
    description: 'The token scope',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  scope: string;

  @ApiProperty({
    description: 'The token type',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  tokenType: string;

  @ApiProperty({
    description: 'The auth user boolean string tag',
    type: String,
  })
  @IsOptional()
  @IsString()
  authUser?: string;

  @ApiProperty({
    description: 'The google oauth prompt',
    type: String,
  })
  @IsOptional()
  @IsString()
  prompt?: string;
}
