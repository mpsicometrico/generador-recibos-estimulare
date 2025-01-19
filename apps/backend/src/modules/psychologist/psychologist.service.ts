import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePsychologistDTO,
  UpdatePsychologistDTO,
} from './psychologist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Psychologist } from './psychologist.entity';

@Injectable()
export class PsychologistService {
  constructor(
    @InjectRepository(Psychologist) private repo: Repository<Psychologist>,
  ) {}
  async create(
    createPsychologistDto: CreatePsychologistDTO,
  ): Promise<Psychologist> {
    const { email } = createPsychologistDto;
    const exists =
      email !== null
        ? await this.repo.findOne({
            where: { email: email },
          })
        : false;
    if (exists)
      throw new ConflictException({
        message: 'El correo ya se encuentra registrado.',
      });

    const psychologist = this.repo.create(createPsychologistDto);
    return await this.repo.save(psychologist);
  }

  async findById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    const psychologist = await this.repo.findOne({ where: { email } });

    if (!psychologist) {
      throw new NotFoundException(
        'No se encontró un terapeuta con el correo electrónico proporcionado.',
      );
    }

    return psychologist;
  }

  async getSelectOptions() {
    const elements = await this.repo.find({
      where: { isActive: true },
      select: ['id', 'name', 'lastName'],
    });

    return elements.map((element) => ({
      id: element.id,
      label: `${element.name} ${element.lastName}`,
    }));
  }

  async update(id: number, updatePsychologistDto: UpdatePsychologistDTO) {
    const exists = await this.findById(id);

    if (!exists) {
      throw new NotFoundException(
        'No se encontró un terapeuta con el ID proporcionado.',
      );
    }

    return await this.repo.save({ ...exists, ...updatePsychologistDto });
  }
}
