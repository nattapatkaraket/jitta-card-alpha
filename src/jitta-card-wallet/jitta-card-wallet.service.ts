import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JittaCardWallet } from './entities/jitta-card-wallet.entity';
import { Repository } from 'typeorm';
import { CreateJittaCardWalletDto } from './dto/create-jitta-card-wallet.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { UpdateJittaCardWalletDto } from './dto/update-jitta-card-wallet.dto';
import { DisplayResDto } from './dto/display-res.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { DebtService } from 'src/debt/debt.service';
import { totalDebt } from 'src/debt/utils/helper';
import { totalJittaBalance } from './utils/helper';
import { DebtEntity } from 'src/debt/entities/debt.entity';

@Injectable()
export class JittaCardWalletService {
  constructor(
    @InjectRepository(JittaCardWallet)
    private readonly jittaCardWalletRepo: Repository<JittaCardWallet>,
    @InjectRepository(DebtEntity)
    private readonly debtRepo: Repository<DebtEntity>,
    private readonly transactionService: TransactionService,
  ) {}

  async display(userId: number): Promise<DisplayResDto> {
    const [jittaCardWallets, transactions, debts] = await Promise.all([
      this.getByUserId(userId),
      this.transactionService.getTransactionByUserId(userId),
      this.debtRepo.find({
        where: {
          userId,
        },
      }),
    ]);

    if (jittaCardWallets.length === 0) {
      return {
        userId,
        totalBalance: 0,
        totalDebt: 0,
        historys: transactions,
        debts,
        jittaCardWallets,
      };
    } else {
      return {
        userId,
        totalBalance: totalJittaBalance(jittaCardWallets),
        totalDebt: totalDebt(debts),
        historys: transactions,
        debts,
        jittaCardWallets,
      };
    }
  }

  async getByUserId(userId: number): Promise<JittaCardWallet[]> {
    return this.jittaCardWalletRepo.find({
      where: {
        userId,
      },
    });
  }

  async create(jittaCardWallet: CreateJittaCardWalletDto): Promise<CommonResponseDto> {
    // check existing jitta card wallet
    const existingJittaCardWallet = await this.jittaCardWalletRepo.findOne({
      where: {
        userId: jittaCardWallet.userId,
      },
    });
    const initJittaCardWallet = {
      userId: jittaCardWallet.userId,
      balance: 0,
      isRoundUp: false,
      isMain: !existingJittaCardWallet,
    };
    const newJittaCardWallet = this.jittaCardWalletRepo.create(initJittaCardWallet);
    const result = await this.jittaCardWalletRepo.save(newJittaCardWallet);

    if (result) {
      return {
        statusCode: 201,
        message: 'Jitta Card Wallet created successfully.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }

  async update(body: UpdateJittaCardWalletDto): Promise<CommonResponseDto> {
    const jittaCardWallet = await this.jittaCardWalletRepo.findOne({
      where: {
        id: body.id,
      },
    });

    if (!jittaCardWallet) {
      return {
        statusCode: 404,
        message: 'Jitta Card Wallet not found.',
      };
    }

    const result = await this.jittaCardWalletRepo.update(jittaCardWallet.id, jittaCardWallet);

    if (result) {
      return {
        statusCode: 200,
        message: 'Jitta Card Wallet updated successfully.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }
}
