import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { type User } from './user.entity';
import { Public } from 'decorators/isPublic.decorator';
// import { Public } from 'decorators/isPublic.decorator';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private repo: UserService) {}

  @Get()
  @Public()
  @ApiQuery({ name: 'email', required: false })
  getAll(@Query('email') email: string): Promise<User[]> {
    return this.repo.getAll(email);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.repo.findById(id);
  }

  @Public()
  // @ApiBearerAuth('false')
  @Post()
  create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.repo.create(createUserDTO);
  }

  @Patch(':id')
  update(
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('id') id: number,
  ): Promise<User> {
    return this.repo.update(updateUserDTO, id);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.repo.delete(id);
  }
}
