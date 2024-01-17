import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { IJwtPayload, IJwtPayloadWithRt } from '../../common/interfaces';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: IJwtPayload): IJwtPayloadWithRt {
    const refreshToken = request
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token malformed');
    }

    // const user = await this.usersService.findOne(payload.userId);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return {
      ...payload,
      refreshToken,
    };
  }
}
