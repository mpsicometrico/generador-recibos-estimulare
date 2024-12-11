import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDTO {
  @ApiProperty({ example: 'Santiago Pérez Campos' })
  @IsString()
  @IsNotEmpty()
  readonly patient: string;

  @ApiProperty({ example: 'Javier Pérez' })
  @IsString()
  @IsNotEmpty()
  readonly father: string;

  @ApiProperty({ example: 'Gabriela Campos' })
  @IsEmail()
  @IsNotEmpty()
  readonly mother: string;

  @ApiProperty({ example: 'Escuela Primaria no° 75' })
  @IsString()
  @IsNotEmpty()
  readonly school: string;
}

export class UpdatePatientDTO extends PartialType(CreatePatientDTO) {
  @IsBoolean()
  readonly isActive: boolean;
}
