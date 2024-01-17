import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IUser } from '../common/interfaces';
import { Public } from '../common/decorators';
import { AuthEntity } from './entities/auth.entity';
import { LocalLoginDto, LocalRegisterDto } from './dto';
import { LocalRegisterEntity } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: LocalRegisterEntity })
  async registerLocal(@Body() dto: LocalRegisterDto): Promise<IUser> {
    return await this.authService.registerLocal(dto);
  }

  @Public()
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() userCredentials: LocalLoginDto) {
    return this.authService.loginLocal(userCredentials);
  }
}
