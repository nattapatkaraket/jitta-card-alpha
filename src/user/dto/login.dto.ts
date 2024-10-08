import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'toon', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;
}
