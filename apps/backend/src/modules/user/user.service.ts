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

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find({ where: { isActive: true } });
  }

  async create(body: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (user)
      throw new ConflictException('El correo ya se encuentra registrado.');

    const payload = {
      ...body,
      password: await bcrypt.hash(body.password, saltOrRounds),
    };

    const newUser = this.userRepository.create(payload);
    return this.userRepository.save(newUser);
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async update(body: UpdateUserDTO, id: number): Promise<User> {
    const user = await this.findById(id);
    return this.userRepository.save({ ...user, ...body });
  }

  async delete(id: number): Promise<User> {
    const user = await this.findById(id);
    return this.userRepository.save({ ...user, isActive: false });
  }
}
