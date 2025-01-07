import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserSession } from 'models/jwt';
import { UserService } from '@modules/user/user.service';
import { Session } from 'types/session';
@Injectable()
export class AuthService {
  constructor(
    private service: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserSession> {
    const { password: hash, ...rest } = await this.service.findByEmail(email);
    if (await bcrypt.compare(password, hash)) {
      return rest;
    }
    return null;
  }

  async login({ id, name, lastName, email }: User): Promise<Session> {
    const payload = { email: email, sub: id };
    return {
      token: this.jwtService.sign(payload),
      user: { id, name, lastName, email },
    };
  }
}
