import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import * as pdf from 'pdfkit';

import { Invoice } from '@modules/invoice/invoice.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly storage: Storage,
  ) {}

  async generatePdf(htmlContent: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const doc = new pdf();
      doc.text(htmlContent, 50, 50);
      doc.end((err, buffer) => {
        if (err) reject(err);
        else resolve(buffer.toString('base64'));
      });
    });
  }

  async uploadToGoogleDrive(
    base64Pdf: string,
    fileName: string,
  ): Promise<string> {
    const bucketName = 'your-bucket-name';
    const file = this.storage.bucket(bucketName).file(`${fileName}.pdf`);

    const buffer = Buffer.from(base64Pdf, 'base64');
    await file.save(buffer, {
      contentType: 'application/pdf',
    });

    return file.publicUrl();
  }

  async sendMail(invoice: Invoice) {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    const pdfBuffer = await this.generatePdf(
      `<p>This is a test email with a PDF attachment.</p>Y4:0`,
    );
    const pdfUrl = await this.uploadToGoogleDrive(
      pdfBuffer,
      `email-${uuidv4()}`,
    );

    this.mailService.sendMail({
      from: 'Estimulare <efren2851@gmail.com>',
      to: 'efren282@outlook.es',
      subject: `Recibo #${invoice.id}`,
      text: message,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: 'Invoice PDF content',
          path: pdfUrl,
        },
      ],
    });
  }
}
