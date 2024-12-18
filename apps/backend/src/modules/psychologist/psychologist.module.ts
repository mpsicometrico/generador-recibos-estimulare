import { Module } from '@nestjs/common';
import { PsychologistService } from './psychologist.service';
import { PsychologistController } from './psychologist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Psychologist } from './psychologist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Psychologist])],
  controllers: [PsychologistController],
  providers: [PsychologistService],
})
export class PsychologistModule {}
