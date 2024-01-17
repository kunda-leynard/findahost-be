export interface IJwtPayload {
  sub: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userRole?: string;
}
