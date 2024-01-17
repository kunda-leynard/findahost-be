import { AuthGuard } from '@nestjs/passport';

export class JwtAuthRefresh extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
