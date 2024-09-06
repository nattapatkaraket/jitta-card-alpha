import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateJittaCardWalletDto {
  @ApiProperty({ example: '1', required: true })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isOfficial: boolean;
}
