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

  @Public()
  @Get()
  get(): Promise<Patient[]> {
    return this.service.getAll();
  }

  @Public()
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

  @Public()
  @Get('select/options')
  async getSelectOptions() {
    return await this.service.getSelectOptions();
  }

  @Public()
  @Patch(':id')
  update(
    @Body() payload: UpdatePatientDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Patient> {
    return this.service.update(payload, id);
  }

  @Public()
  @Get('obtain-debt/:id')
  obtainDebt(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.service.getDebt(id);
  }

  @Public()
  @Patch('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.service.delete(id);
  }
}
