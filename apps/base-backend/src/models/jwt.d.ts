import { User } from '@modules/users/users.entity';

export interface JwtPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export type UserSession = Omit<User, 'password'>;
