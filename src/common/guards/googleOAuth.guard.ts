import { AuthGuard } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  constructor() {
    /* Google Refresh Token */
    super({
      accessType: 'offline',
      approvalPrompt: 'force', // auto login existing user
      prompt: 'select_account', // forces users to select account
    });
  }

  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw new HttpException(error.message, error.status);
    }

    return user;
  }
}
