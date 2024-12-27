import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invoice } from './invoice.entity';
import { CreateInvoiceDTO } from './invoice.dto';
import { MailService } from '@modules/mail/mail.service';
import { PatientService } from '@modules/patient/patient.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private repo: Repository<Invoice>,
    private patientService: PatientService,
    private mailService: MailService,
  ) {}

  async getAll(): Promise<Invoice[]> {
    return this.repo.find();
  }

  async create({
    paid,
    patientId,
    price,
    ...body
  }: CreateInvoiceDTO): Promise<Invoice> {
    const result = await this.repo.manager.transaction(
      async (transactionalManager) => {
        const newInvoice = transactionalManager.create(Invoice, {
          ...body,
          paid,
          price,
          patient: { id: patientId },
        });

        const invoice = await transactionalManager.save(newInvoice);

        const difference = price - paid;

        if (difference !== 0) {
          await this.patientService.updateDebt(
            transactionalManager,
            patientId,
            difference,
          );
        }

        const query = await transactionalManager
          .createQueryBuilder(Invoice, 'invoice')
          .leftJoinAndSelect('invoice.patient', 'patient')
          .leftJoinAndSelect('patient.psychologist', 'psychologist')
          .where('invoice.id = :id', { id: invoice.id })
          .getOne();

        this.mailService.sendMail(query);
        return invoice;
      },
    );

    return result;
  }

  async findById(id: number): Promise<Invoice> {
    const Invoice = await this.repo.findOne({ where: { id } });
    if (Invoice === null) {
      throw new NotFoundException(`Recibo con el id ${id} no encontrado.`);
    }
    return Invoice;
  }
}
