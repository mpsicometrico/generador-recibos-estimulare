import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDTO {
  @ApiProperty({ example: 'Santiago Pérez Campos' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Javier Pérez' })
  @IsString()
  @IsOptional()
  readonly father?: string;

  @ApiProperty({ example: 'Gabriela Campos' })
  @IsString()
  @IsOptional()
  readonly mother?: string;

  @ApiProperty({ example: 'Escuela Primaria no° 75' })
  @IsString()
  @IsOptional()
  readonly school?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly psychologistId: number;
}

export class UpdatePatientDTO extends PartialType(CreatePatientDTO) {
  @IsBoolean()
  readonly isActive: boolean;
}
