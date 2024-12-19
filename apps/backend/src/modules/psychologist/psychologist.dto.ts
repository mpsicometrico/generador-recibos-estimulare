import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePsychologistDTO {
  @ApiProperty({ example: 'Daniel' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Orozco' })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'daniel.orozco@estimulare.com' })
  @IsEmail()
  @IsOptional()
  readonly email?: string;
}

export class UpdatePsychologistDTO extends PartialType(CreatePsychologistDTO) {}
