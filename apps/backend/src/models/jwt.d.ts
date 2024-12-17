import { User } from '@modules/patient/patient.entity';

export interface JwtPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export type UserSession = Omit<User, 'password'>;
