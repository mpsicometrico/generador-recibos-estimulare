import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { UserSession } from 'models/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserSession> {
    const { password: hash, ...rest } = await this.usersService.findUserByEmail(
      email,
    );
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
