import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

import { Invoice } from '@modules/invoice/invoice.entity';
import { ConfigService } from '@nestjs/config';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '@modules/printer/printer.service';
import { toLocaleDateString } from 'utils/date-functions';
import { createReadStream, createWriteStream } from 'fs';

@Injectable()
export class MailService {
  private readonly oauth2Client: OAuth2Client;
  constructor(
    private readonly mailService: MailerService,
    private readonly printer: PrinterService,
    private configService: ConfigService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      this.configService.get('GOOGLE_REDIRECT_URI'),
    );

    this.oauth2Client.setCredentials({
      refresh_token: this.configService.get('GOOGLE_REFRESH_TOKEN'),
    });
  }

  async sendMail(invoice: Invoice) {
    const { patient, type, createdAt } = invoice;

    const message = `Recibo del pago recibido del paciente ${invoice.patient.name}`;

    const docDefinition: TDocumentDefinitions = {
      content: ['Testing', 'Estimulare'],
    };

    const pdf = this.printer.createPdf(docDefinition);

    const path = `${__dirname}invoice.pdf`;
    pdf.pipe(createWriteStream(path));
    pdf.end();

    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

    try {
      const {
        data: { files },
      } = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder'`,
        fields: 'files(id, name)',
      });

      const actualYear = new Date().getFullYear();

      const folderName = `${this.configService.get('GOOGLE_DRIVE_FOLDER')}-${actualYear}`;

      let remoteFolder = files.find((f) => f.name === folderName);

      if (files.length === 0 || !remoteFolder) {
        const {
          data: { id, name },
        } = await drive.files.create({
          requestBody: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
          },
        });

        remoteFolder = { id, name };
      }

      await drive.files.create({
        requestBody: {
          name: `recibo-${invoice.patient.name}-${invoice.id}.pdf`,
          mimeType: 'application/pdf',
          parents: [remoteFolder.id],
        },
        media: {
          mimeType: 'application/pdf',
          body: createReadStream(path),
        },
      });

      this.mailService.sendMail({
        from: 'Estimulare <efren2851@gmail.com>',
        to: 'efren282@outlook.es',
        subject: `Recibo #${invoice.id} - ${patient.name} - ${type} - ${toLocaleDateString(createdAt)}`,
        text: message,
        attachments: [
          {
            filename: 'invoice.pdf',
            content: 'Invoice PDF content',
            path,
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  }
}
