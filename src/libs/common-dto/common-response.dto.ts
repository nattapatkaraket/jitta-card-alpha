import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommonResponseDto {
  @ApiProperty({ example: 200, required: true })
  @IsNumber()
  @IsNotEmpty()
  statusCode: number;

  @ApiProperty({ example: 'success.', required: true })
  @IsNumber()
  @IsNotEmpty()
  message: string;
}
