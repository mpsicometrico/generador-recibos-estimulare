import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PatientService } from './service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreatePatientDTO, UpdatePatientDTO } from './dto';
import { type Patient } from './entity';
import { Public } from 'decorators/isPublic.decorator';

@ApiTags('patient')
@ApiBearerAuth()
@Controller('patient')
export class PatientController {
  constructor(private service: PatientService) {}

  @Get()
  getUser(): Promise<Patient[]> {
    return this.service.getAll();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.service.findById(id);
  }

  @Public()
  @ApiBearerAuth('false')
  @Post()
  createUser(@Body() payload: CreatePatientDTO): Promise<Patient> {
    return this.service.create(payload);
  }

  @Patch(':id')
  updateUser(
    @Body() payload: UpdatePatientDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Patient> {
    return this.service.update(payload, id);
  }

  @Patch('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.service.delete(id);
  }
}
