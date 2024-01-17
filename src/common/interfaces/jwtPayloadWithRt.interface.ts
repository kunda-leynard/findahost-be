import { IJwtPayload } from './jwtPayload.interface';

export interface IJwtPayloadWithRt extends IJwtPayload {
  refreshToken: string;
}
