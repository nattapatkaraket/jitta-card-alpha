import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'toon', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isOfficial: boolean;
}
