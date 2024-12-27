import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDTO {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  readonly patientId: number;

  @ApiProperty({ example: 'Psicoterapia' })
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ example: '99999.99' })
  @IsDecimal({ decimal_digits: '2' })
  readonly price: number;

  @ApiProperty({ example: '9999.99' })
  @IsDecimal({ decimal_digits: '2' })
  readonly paid: number;
}
