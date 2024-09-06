import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { FromType, ToType, TransactionType } from '../models/transaction.enum';

export class CreateTransactionDto {
  // type_id, from, to, userId

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 100, required: true })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: FromType.OUTSIDE, required: true })
  @IsString()
  @IsNotEmpty()
  from: FromType;

  @ApiProperty({ example: -1, required: true })
  @IsNumber()
  @IsNotEmpty()
  fromValue: number;

  @ApiProperty({ example: ToType.JITTACARD_WALLET, required: true })
  @IsString()
  @IsNotEmpty()
  to: ToType;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  toValue: number;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsOptional()
  debtTypeId: number;

  @ApiProperty({ example: TransactionType.DEPOSIT, required: true })
  @IsNotEmpty()
  transactionType: TransactionType;
}
