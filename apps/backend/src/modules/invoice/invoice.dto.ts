import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateInvoiceDTO {
  @ApiProperty({ example: 'Psicoterapia' })
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ example: '850.00' })
  @IsDecimal({ decimal_digits: '2' })
  readonly price: number;
}