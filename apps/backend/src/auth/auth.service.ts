import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserSession } from 'models/jwt';
import { UserService } from '@modules/user/user.service';
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

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
