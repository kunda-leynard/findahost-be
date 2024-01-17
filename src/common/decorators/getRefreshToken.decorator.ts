import { IJwtPayloadWithRt } from '../interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRefreshToken = createParamDecorator(
  (data: keyof IJwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!data) {
      return request.user;
    }

    return request.user[data];
  },
);
