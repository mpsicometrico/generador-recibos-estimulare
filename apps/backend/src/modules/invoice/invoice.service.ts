import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invoice } from './invoice.entity';
import { CreateInvoiceDTO } from './invoice.dto';
import { MailService } from '@modules/mail/mail.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private repo: Repository<Invoice>,
    private mailService: MailService,
  ) {}

  async getAll(): Promise<Invoice[]> {
    return this.repo.find();
  }

  async create(body: CreateInvoiceDTO): Promise<Invoice> {
    const payload = {
      ...body,
    };

    const newInvoice = this.repo.create({
      ...payload,
      patient: { id: body.patientId },
    });

    const invoice = await this.repo.save(newInvoice);

    const query = await this.repo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.patient', 'patient')
      .leftJoinAndSelect('patient.psychologist', 'psychologist')
      .where('invoice.id = :id', { id: invoice.id })
      .getOne();

    this.mailService.sendMail(query);
    return invoice;
  }

  async findById(id: number): Promise<Invoice> {
    const Invoice = await this.repo.findOne({ where: { id } });
    if (Invoice === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return Invoice;
  }
}
