import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateInvoiceDTO } from './invoice.dto';
import { type Invoice } from './invoice.entity';
import { Public } from 'decorators/isPublic.decorator';

@ApiTags('invoice')
@ApiBearerAuth()
@Controller('invoice')
export class InvoiceController {
  constructor(private service: InvoiceService) {}

  @Public()
  @Get()
  get(): Promise<Invoice[]> {
    return this.service.getAll();
  }

  @Public()
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Invoice> {
    return this.service.findById(id);
  }

  @Public()
  @ApiBearerAuth('false')
  @Post()
  create(@Body() payload: CreateInvoiceDTO): Promise<Invoice> {
    return this.service.create(payload);
  }
}
