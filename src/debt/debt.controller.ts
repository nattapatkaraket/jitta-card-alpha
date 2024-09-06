import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DebtService } from './debt.service';
import { Debt } from './entities/debt.entity';
import { CreateDebtDto } from './dto/create-debt.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('debt')
@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Get()
  async getAll(): Promise<Debt[]> {
    return this.debtService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Debt> {
    return this.debtService.getById(id);
  }

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: number): Promise<Debt[]> {
    return this.debtService.getByUserId(userId);
  }

  @Post()
  async create(body: CreateDebtDto): Promise<CommonResponseDto> {
    return this.debtService.create(body);
  }

  @Patch()
  async update(body: UpdateDebtDto): Promise<CommonResponseDto> {
    return this.debtService.update(body);
  }
}
