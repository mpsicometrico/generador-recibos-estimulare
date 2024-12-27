import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Invoice } from './invoice.entity';
import { MailModule } from '@modules/mail/mail.module';
import { PatientModule } from '@modules/patient/patient.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), MailModule, PatientModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
