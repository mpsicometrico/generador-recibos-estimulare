import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PsychologistService } from './psychologist.service';
import {
  CreatePsychologistDTO,
  UpdatePsychologistDTO,
} from './psychologist.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/isPublic.decorator';

@Controller('psychologist')
@ApiTags('psychologist')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Public()
  @Post()
  async create(@Body() createPsychologistDto: CreatePsychologistDTO) {
    return await this.psychologistService.create(createPsychologistDto);
  }

  // @Get()
  // findAll() {
  //   return this.psychologistService.findAll();
  // }

  @Public()
  @Get('select/options')
  async getSelectOptions() {
    return await this.psychologistService.getSelectOptions();
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePsychologistDto: UpdatePsychologistDTO,
  ) {
    return await this.psychologistService.update(id, updatePsychologistDto);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.psychologistService.remove(id);
  // }
}
