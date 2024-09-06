import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';

// extend from CommonResDto and add id field
export class CreateJittaRes extends CommonResponseDto {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
