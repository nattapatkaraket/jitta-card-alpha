import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDebtTypeDto {
  @ApiProperty({ example: 'สินเชื่อกู้ยืม', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ไม่มีค่าธรรมเนียม และดอกเบี้ยต่ำ', required: true })
  @IsString()
  @IsNotEmpty()
  detail: string;
}
