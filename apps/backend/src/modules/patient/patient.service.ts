import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Patient } from './patient.entity';
import { CreatePatientDTO, UpdatePatientDTO } from './patient.dto';

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

    const newPatient = this.repo.create({
      ...payload,
      psychologist: { id: body.psychologistId },
    });
    return await this.repo.save(newPatient);
  }

  async findById(id: number): Promise<Patient> {
    const patient = await this.repo.findOne({ where: { id } });
    if (patient === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return patient;
  }

  async getSelectOptions() {
    const elements = await this.repo.find({
      where: { isActive: true },
      select: ['id', 'name', 'father', 'mother'],
    });

    return elements.map(({ id, name, father, mother }) => ({
      id: id,
      label: `${name}${father != null ? `- ${father}` : ''}${mother != null ? ` ${mother}` : ''}`,
    }));
  }

  async update(body: UpdatePatientDTO, id: number): Promise<Patient> {
    const patient = await this.findById(id);
    return await this.repo.save({ ...patient, ...body });
  }

  async updateDebt(
    transactionalManager: EntityManager,
    patientId: number,
    amount: number,
  ): Promise<void> {
    const patient = await transactionalManager.findOne(Patient, {
      where: { id: patientId },
    });

    patient.debt -= amount;

    await transactionalManager.save(Patient, { ...patient });
  }

  async getDebt(id: number) {
    const patient = await this.findById(id);

    return patient.debt;
  }

  async delete(id: number): Promise<Patient> {
    const patient = await this.findById(id);
    return this.repo.save({ ...patient, isActive: false });
  }
}
