import { Module } from '@nestjs/common';
import { PatientController } from './controller';
import { PatientService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Patient } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class UserModule {}
