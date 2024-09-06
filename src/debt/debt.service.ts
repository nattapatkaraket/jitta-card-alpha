import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtEntity } from './entities/debt.entity';
import { Repository } from 'typeorm';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { CreateDebtDto } from './dto/create-debt.dto';
import { DebtTypeService } from 'src/debt-type/debt-type.service';
import { UserService } from 'src/user/user.service';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(DebtEntity)
    private readonly debtRepo: Repository<DebtEntity>,
    private readonly debtTypeService: DebtTypeService,
    private readonly userService: UserService,
  ) {}

  async getAll(): Promise<DebtEntity[]> {
    return this.debtRepo.find();
  }

  async getById(id: number): Promise<DebtEntity> {
    return this.debtRepo.findOneBy({ id });
  }

  async getByUserId(userId: number): Promise<DebtEntity[]> {
    return this.debtRepo.find({
      where: {
        userId: userId,
      },
    });
  }

  async create(debt: CreateDebtDto): Promise<CommonResponseDto> {
    // check if debt type id is valid
    const debtType = await this.debtTypeService.getById(debt.debtTypeId);
    if (debtType instanceof CommonResponseDto) {
      return {
        statusCode: 404,
        message: 'debt type not found',
      };
    }

    // check if user id is valid
    const user = await this.userService.getById(debt.userId);
    if (user instanceof CommonResponseDto) {
      return {
        statusCode: 404,
        message: 'user not found',
      };
    }

    // create debt
    const newDebt = this.debtRepo.create(debt);
    const result = await this.debtRepo.save(newDebt);
    if (result) {
      return {
        statusCode: 201,
        message: 'debt created successfully',
      };
    } else {
      return {
        statusCode: 400,
        message: 'bad request: cannot create debt',
      };
    }
  }

  async update(body: UpdateDebtDto): Promise<CommonResponseDto> {
    const debt = await this.debtRepo.findOneBy({ id: body.id });
    if (!debt) {
      return {
        statusCode: 404,
        message: 'debt not found',
      };
    }

    const result = await this.debtRepo.update(body.id, body);
    if (result) {
      return {
        statusCode: 200,
        message: 'debt updated successfully',
      };
    } else {
      return {
        statusCode: 400,
        message: 'bad request: cannot update debt',
      };
    }
  }
}
