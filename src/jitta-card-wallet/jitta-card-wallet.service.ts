import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JittaCardWallet } from './entities/jitta-card-wallet.entity';
import { Repository } from 'typeorm';
import { CreateJittaCardWalletDto } from './dto/create-jitta-card-wallet.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { UpdateJittaCardWalletDto } from './dto/update-jitta-card-wallet.dto';
import { DisplayResDto } from './dto/display-res.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { totalJittaBalance } from './utils/helper';
import { Debt } from 'src/debt/entities/debt.entity';
import { totalUnpaidDebt } from 'src/debt/utils/helper';
import { CreateJittaRes } from './dto/create-res.dto';

@Injectable()
export class JittaCardWalletService {
  constructor(
    @InjectRepository(JittaCardWallet)
    private readonly jittaCardWalletRepo: Repository<JittaCardWallet>,
    @InjectRepository(Debt)
    private readonly debtRepo: Repository<Debt>,
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
        totalDebt: totalUnpaidDebt(debts),
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

  async create(jittaCardWallet: CreateJittaCardWalletDto): Promise<CreateJittaRes> {
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
      isOfficial: jittaCardWallet.isOfficial,
    };
    const newJittaCardWallet = this.jittaCardWalletRepo.create(initJittaCardWallet);
    const result = await this.jittaCardWalletRepo.save(newJittaCardWallet);

    if (result) {
      return {
        id: result.id,
        statusCode: 201,
        message: 'Jitta Card Wallet created successfully.',
      };
    } else {
      return {
        id: -1,
        statusCode: 400,
        message: 'Jitta Card Wallet creation failed.',
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

    const result = await this.jittaCardWalletRepo.update(jittaCardWallet.id, body);

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
