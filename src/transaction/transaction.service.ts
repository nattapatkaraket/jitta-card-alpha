import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { JittaCardWalletService } from 'src/jitta-card-wallet/jitta-card-wallet.service';
import { EarnWalletService } from 'src/earn-wallet/earn-wallet.service';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from './models/transaction.enum';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly jittaCardWalletService: JittaCardWalletService,
    private readonly earnWalletService: EarnWalletService,
  ) {}

  async getTransactionByUserId(userId: number): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: {
        userId,
      },
    });
  }

  async create(body: CreateTransactionDto): Promise<CommonResponseDto> {
    let isTransactionSuccess = false;
    switch (body.transactionType) {
      case TransactionType.DEPOSIT:
        try {
          await this.jittaCardWalletService.deposit({
            walletId: parseInt(body.from),
            amount: body.amount,
          });
          isTransactionSuccess = true;
        } catch (error) {
          isTransactionSuccess = false;
        }
        break;

      case TransactionType.WITHDRAW:
        try {
          await this.jittaCardWalletService.withdraw({
            walletId: parseInt(body.from),
            amount: body.amount,
          });
          isTransactionSuccess = true;
        } catch (error) {
          isTransactionSuccess = false;
        }
        break;
      case TransactionType.TRANSFER:
        try {
          await this.jittaCardWalletService.withdraw({
            walletId: parseInt(body.from),
            amount: body.amount,
          });
          await this.jittaCardWalletService.deposit({
            walletId: parseInt(body.to),
            amount: body.amount,
          });
          isTransactionSuccess = true;
        } catch (error) {
          isTransactionSuccess = false;
        }
        break;

      default:
        isTransactionSuccess = false;
        break;
    }

    if (isTransactionSuccess) {
      return {
        statusCode: 201,
        message: 'Transaction created successfully.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }
}
