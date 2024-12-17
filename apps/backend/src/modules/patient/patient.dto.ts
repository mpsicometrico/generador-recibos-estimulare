import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDTO {
  @ApiProperty({ example: 'Santiago Pérez Campos' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Javier Pérez' })
  @IsString()
  readonly father: string;

  @ApiProperty({ example: 'Gabriela Campos' })
  @IsString()
  readonly mother: string;

  @ApiProperty({ example: 'Escuela Primaria no° 75' })
  @IsString()
  readonly school: string;
}

export class UpdatePatientDTO extends PartialType(CreatePatientDTO) {
  @IsBoolean()
  readonly isActive: boolean;
}
