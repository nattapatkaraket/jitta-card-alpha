import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtEntity } from './entities/debt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(DebtEntity)
    private readonly debtRepo: Repository<DebtEntity>,
  ) {}

  async getAll(): Promise<DebtEntity[]> {
    return this.debtRepo.find();
  }
}
