import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  @IsNotEmpty()
  readonly email: string;
}

export class UpdatePsychologistDTO extends PartialType(CreatePsychologistDTO) {}
