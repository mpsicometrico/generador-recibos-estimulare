import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { type User } from './users.entity';
import { Public } from 'decorators/isPublic.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Public()
  @ApiBearerAuth('false')
  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(createUserDTO);
  }

  @Patch(':id')
  updateUser(
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('id') id: number,
  ): Promise<User | string> {
    return this.usersService.updateUser(updateUserDTO, id);
  }

  @Patch('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
