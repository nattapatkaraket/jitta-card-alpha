import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateEarnWalletDto {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 100, required: true })
  @IsNumber()
  @IsOptional()
  balance: number;

  @ApiProperty({ example: false, required: true })
  @IsOptional()
  @IsBoolean()
  isMain: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isOfficial: boolean;
}
