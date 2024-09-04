import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EarnWallet } from './entities/earn-wallet.entity';
import { Repository } from 'typeorm';
import { CreateEarnWalletDto } from './dto/create-jitta-card-wallet.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithDrawDto } from './dto/withdraw.dto';

@Injectable()
export class EarnWalletService {
  constructor(
    @InjectRepository(EarnWallet)
    private readonly earnWalletRepo: Repository<EarnWallet>,
  ) {}

  async getByUserId(userId: number): Promise<EarnWallet> {
    return this.earnWalletRepo.findOne({
      where: {
        userId,
      },
    });
  }

  async create(body: CreateEarnWalletDto): Promise<CommonResponseDto> {
    const initEarnWallet = {
      userId: body.userId,
      balance: 0,
    };
    const newEarnWallet = this.earnWalletRepo.create(initEarnWallet);
    const result = await this.earnWalletRepo.save(newEarnWallet);

    if (result) {
      return {
        statusCode: 201,
        message: 'Earn Wallet created successfully.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }

  async deposit(body: DepositDto): Promise<CommonResponseDto> {
    const jittaCardWallet = await this.earnWalletRepo.findOne({
      where: {
        id: body.walletId,
      },
    });
    jittaCardWallet.balance += body.amount;
    const result = await this.earnWalletRepo.save(jittaCardWallet);

    if (result) {
      return {
        statusCode: 200,
        message: 'Deposit successful.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }

  async withdraw(body: WithDrawDto): Promise<CommonResponseDto> {
    const jittaCardWallet = await this.earnWalletRepo.findOne({
      where: {
        id: body.walletId,
      },
    });
    jittaCardWallet.balance -= body.amount;
    const result = await this.earnWalletRepo.save(jittaCardWallet);
    if (result) {
      return {
        statusCode: 200,
        message: 'Withdraw successful.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }
}
