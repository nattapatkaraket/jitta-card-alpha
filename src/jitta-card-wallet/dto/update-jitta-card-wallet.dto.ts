import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateJittaCardWalletDto {
  @ApiProperty({ example: '1', required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: '100', required: true })
  @IsNumber()
  @IsOptional()
  balance: number;

  @ApiProperty({ example: 'true', required: true })
  @IsBoolean()
  @IsOptional()
  isRoundUp: boolean;

  @ApiProperty({ example: 'false', required: true })
  @IsBoolean()
  @IsOptional()
  isMain: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isOfficial: boolean;
}
