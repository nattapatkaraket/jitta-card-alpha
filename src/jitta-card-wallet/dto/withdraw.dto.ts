import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class WithDrawDto {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  walletId: number;

  @ApiProperty({ example: 1000, required: true })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
