import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateDebtDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  total: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  paid: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  debtTypeId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  userId: number;
}
