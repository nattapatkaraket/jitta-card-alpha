import { ApiProperty } from '@nestjs/swagger';
import { CreateDebtTypeDto } from './create-debt-type.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDeptTypeDto extends CreateDebtTypeDto {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
