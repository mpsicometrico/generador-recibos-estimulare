import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO, UpdateUserDTO } from './dto';
import { type Patient } from './entity';
import { Public } from 'decorators/isPublic.decorator';

@ApiTags('patient')
@ApiBearerAuth()
@Controller('patient')
export class PatientController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(): Promise<Patient[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.userService.findUserById(id);
  }

  @Public()
  @ApiBearerAuth('false')
  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO): Promise<Patient> {
    return this.userService.createUser(createUserDTO);
  }

  @Patch(':id')
  updateUser(
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('id') id: number,
  ): Promise<Patient | string> {
    return this.userService.updateUser(updateUserDTO, id);
  }

  @Patch('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.userService.deleteUser(id);
  }
}
