import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DebtType } from './entites/debt-type.entity';
import { CreateDebtTypeDto } from './dto/create-debt-type.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { UpdateDebtTypeDto } from './dto/update-debt-type.dto';
import { DeleteDebtTypeDto } from './dto/delete-debt-type.dto';

@Injectable()
export class DebtTypeService {
  constructor(
    @InjectRepository(DebtType)
    private readonly debtTypeRepo: Repository<DebtType>,
  ) {}

  async getAll(): Promise<DebtType[]> {
    return this.debtTypeRepo.find();
  }

  async getById(id: number): Promise<DebtType | CommonResponseDto> {
    const debtType = await this.debtTypeRepo.findOneBy({ id });
    if (!debtType) {
      return {
        statusCode: 404,
        message: 'Debt type not found.',
      };
    }
    return this.debtTypeRepo.findOneBy({ id });
  }

  async create(body: CreateDebtTypeDto): Promise<CommonResponseDto> {
    const newDebtType = this.debtTypeRepo.create(body);
    const result = await this.debtTypeRepo.save(newDebtType);
    if (result) {
      return {
        statusCode: 201,
        message: 'Debt type created successfully.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }

  async update(body: UpdateDebtTypeDto): Promise<CommonResponseDto> {
    const result = await this.debtTypeRepo.update(body.id, body);

    if (result.affected) {
      return {
        statusCode: 200,
        message: 'Debt type updated successfully.',
      };
    } else {
      return {
        statusCode: 404,
        message: 'Debt type not found.',
      };
    }
  }

  async delete(body: DeleteDebtTypeDto): Promise<CommonResponseDto> {
    const result = await this.debtTypeRepo.delete(body.id);

    if (result.affected) {
      return {
        statusCode: 200,
        message: 'Debt type deleted successfully.',
      };
    } else {
      return {
        statusCode: 404,
        message: 'Debt type not found.',
      };
    }
  }
}
