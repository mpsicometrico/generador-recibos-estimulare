import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreatePatientDTO, UpdatePatientDTO } from './patient.dto';
import { type Patient } from './patient.entity';
import { Public } from 'decorators/isPublic.decorator';

@ApiTags('patient')
@ApiBearerAuth()
@Controller('patient')
export class PatientController {
  constructor(private service: PatientService) {}

  @Get()
  get(): Promise<Patient[]> {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.service.findById(id);
  }

  @Public()
  @ApiBearerAuth('false')
  @Post()
  create(@Body() payload: CreatePatientDTO): Promise<Patient> {
    return this.service.create(payload);
  }

  @Patch(':id')
  update(
    @Body() payload: UpdatePatientDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Patient> {
    return this.service.update(payload, id);
  }

  @Patch('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.service.delete(id);
  }
}
