import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: config.get<string>('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: config.get<string>('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: any,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      accessToken,
      refreshToken,
      profile,
    };

    done(null, user);
  }
}
