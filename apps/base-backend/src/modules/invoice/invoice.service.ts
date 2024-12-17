import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invoice } from './invoice.entity';
import { CreateInvoiceDTO } from './invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private repo: Repository<Invoice>) {}

  async getAll(): Promise<Invoice[]> {
    return this.repo.find();
  }

  async create(body: CreateInvoiceDTO): Promise<Invoice> {
    const payload = {
      ...body,
    };

    const newInvoice = this.repo.create(payload);
    return await this.repo.save(newInvoice);
  }

  async findById(id: number): Promise<Invoice> {
    const Invoice = await this.repo.findOne({ where: { id } });
    if (Invoice === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return Invoice;
  }
}
