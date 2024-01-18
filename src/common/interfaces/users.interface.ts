import { Users as UserEntity } from "@prisma/client";

export interface IUser extends Partial<UserEntity> {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  registration?: string;
  profileImage?: string;
  mobile?: string | null;
  googleId: string | null;
  userRole?: string | null;
}
