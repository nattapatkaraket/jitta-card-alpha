import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DebtTypeService } from './debt-type.service';
import { CreateDebtTypeDto } from './dto/create-debt-type.dto';
import { DebtTypeEntity } from './entites/debt-type.entity';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { UpdateDeptTypeDto } from './dto/update-dept-type.dto';
import { DeleteDebtTypeDto } from './dto/delete-debt-type.dto';

@ApiTags('debt-type')
@Controller('debt-type')
export class DebtTypeController {
  constructor(private readonly debtTypeService: DebtTypeService) {}

  @Get()
  async getAll(): Promise<DebtTypeEntity[]> {
    return this.debtTypeService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<DebtTypeEntity | CommonResponseDto> {
    return this.debtTypeService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateDebtTypeDto): Promise<CommonResponseDto> {
    return this.debtTypeService.create(body);
  }

  @Patch()
  async update(@Body() body: UpdateDeptTypeDto): Promise<CommonResponseDto> {
    return this.debtTypeService.update(body);
  }

  @Delete()
  async delete(@Body() body: DeleteDebtTypeDto): Promise<CommonResponseDto> {
    return this.debtTypeService.delete(body);
  }
}
