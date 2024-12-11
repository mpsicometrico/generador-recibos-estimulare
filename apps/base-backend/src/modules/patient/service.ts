import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Patient } from './entity';
import { CreatePatientDTO, UpdatePatientDTO } from './dto';

@Injectable()
export class PatientService {
  constructor(@InjectRepository(Patient) private repo: Repository<Patient>) {}

  async getAll(): Promise<Patient[]> {
    return this.repo.find();
  }

  async create(body: CreatePatientDTO): Promise<Patient> {
    const payload = {
      ...body,
    };

    const newUser = this.repo.create(payload);
    return await this.repo.save(newUser);
  }

  async findById(id: number): Promise<Patient> {
    const patient = await this.repo.findOne({ where: { id } });
    if (patient === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return patient;
  }

  async update(body: UpdatePatientDTO, id: number): Promise<Patient> {
    const patient = await this.findById(id);
    return this.repo.save({ ...patient, ...body });
  }

  async delete(id: number): Promise<Patient> {
    const patient = await this.findById(id);
    return this.repo.save({ ...patient, isActive: false });
  }
}
