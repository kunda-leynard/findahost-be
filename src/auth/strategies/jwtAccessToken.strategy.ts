import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable /* UnauthorizedException */ } from '@nestjs/common';

import { IJwtPayload } from '../../common/interfaces';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: IJwtPayload) {
    // const user = await this.usersService.findOne(payload.userId);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return payload;
  }
}
