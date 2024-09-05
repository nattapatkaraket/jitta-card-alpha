import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TransactionType } from '../models/transaction.enum';

export class CreateTransactionDto {
  // type_id, from, to, user_id

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 100, required: true })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '1', required: true })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({ example: '2', required: true })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ example: TransactionType.DEPOSIT, required: true })
  @IsNotEmpty()
  transactionType: TransactionType;
}
