import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientModule } from './modules/patient/patient.module';
import { TypeOrmConfigService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { PsychologistModule } from './modules/psychologist/psychologist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    AuthModule,
    PatientModule,
    InvoiceModule,
    PsychologistModule,
  ],
})
export class AppModule {}
