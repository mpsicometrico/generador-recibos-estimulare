import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { type User } from './user.entity';
import { Public } from 'decorators/isPublic.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Public()
  @ApiBearerAuth('false')
  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO);
  }

  @Patch(':id')
  updateUser(
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('id') id: number,
  ): Promise<User | string> {
    return this.userService.update(updateUserDTO, id);
  }

  @Patch('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete(id);
  }
}
