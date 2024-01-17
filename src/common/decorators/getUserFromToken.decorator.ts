import { IJwtPayload } from '../interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserFromToken = createParamDecorator(
  (_: undefined, context: ExecutionContext): IJwtPayload => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
