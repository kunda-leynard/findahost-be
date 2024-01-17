import { ApiProperty } from '@nestjs/swagger';

export class LocalRegisterEntity {
  @ApiProperty({
    description: `The user's unique id`,
    type: String,
  })
  id: string;

  @ApiProperty({
    description: `The user's first name`,
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: `The user's last name`,
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: `The user's mobile number`,
    type: String,
  })
  mobile: string;

  @ApiProperty({
    description: `The user's role type`,
    type: String,
  })
  userRole: string;

  @ApiProperty({
    description: `The user's email`,
    example: 'example@gmail.com',
    minLength: 5,
    maxLength: 255,
    type: String,
  })
  email: string;

  @ApiProperty({
    description: `The user's google Id`,
    type: String,
  })
  googleId: string;
}
