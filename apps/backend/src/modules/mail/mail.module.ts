import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrinterModule } from '@modules/printer/printer.module';
import { PrinterService } from '@modules/printer/printer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule, PrinterModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get('EMAIL_USERNAME'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [MailService, PrinterService],
  exports: [MailService],
})
export class MailModule {}
