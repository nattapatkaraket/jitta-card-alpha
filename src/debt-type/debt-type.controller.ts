import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DebtTypeService } from './debt-type.service';
import { CreateDebtTypeDto } from './dto/create-debt-type.dto';
import { DebtType } from './entites/debt-type.entity';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { UpdateDebtTypeDto } from './dto/update-debt-type.dto';
import { DeleteDebtTypeDto } from './dto/delete-debt-type.dto';

@ApiTags('debt-type')
@Controller('debt-type')
export class DebtTypeController {
  constructor(private readonly debtTypeService: DebtTypeService) {}

  @Get()
  async getAll(): Promise<DebtType[]> {
    return this.debtTypeService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<DebtType | CommonResponseDto> {
    return this.debtTypeService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateDebtTypeDto): Promise<CommonResponseDto> {
    return this.debtTypeService.create(body);
  }

  @Patch()
  async update(@Body() body: UpdateDebtTypeDto): Promise<CommonResponseDto> {
    return this.debtTypeService.update(body);
  }

  @Delete()
  async delete(@Body() body: DeleteDebtTypeDto): Promise<CommonResponseDto> {
    return this.debtTypeService.delete(body);
  }
}
