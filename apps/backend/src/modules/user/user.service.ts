import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { MailerService } from '@nestjs-modules/mailer';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly mailService: MailerService,
  ) {}

  async getAll(email?: string): Promise<User[]> {
    const whereArgs = { isActive: true };

    if (email) {
      whereArgs['email'] = email;
    }

    return this.repo.find({
      where: whereArgs,
      select: ['id', 'email', 'name', 'lastName', 'isActive'],
    });
  }

  async create(body: CreateUserDTO): Promise<User> {
    const user = await this.repo.findOne({
      where: { email: body.email },
    });
    if (user)
      throw new ConflictException('El correo ya se encuentra registrado.');

    const payload = {
      ...body,
      password: await bcrypt.hash(body.password, saltOrRounds),
    };

    const newUser = this.repo.create(payload);
    return this.repo.save(newUser);
  }

  async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (user === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repo.findOne({ where: { email } });
    if (user === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async update(body: UpdateUserDTO, id: number): Promise<User> {
    const user = await this.findById(id);
    return this.repo.save({ ...user, ...body });
  }

  async delete(id: number): Promise<User> {
    const user = await this.findById(id);
    return this.repo.save({ ...user, isActive: false });
  }
}
