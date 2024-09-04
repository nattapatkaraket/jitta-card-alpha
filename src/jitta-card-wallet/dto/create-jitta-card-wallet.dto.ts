import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJittaCardWalletDto {
  @ApiProperty({ example: '1', required: true })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
