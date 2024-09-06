import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { JittaCardWallet } from 'src/jitta-card-wallet/entities/jitta-card-wallet.entity';
import { EarnWallet } from 'src/earn-wallet/entities/earn-wallet.entity';
import { User } from 'src/user/entities/user.entity';
import { DebtType } from 'src/debt-type/entites/debt-type.entity';
import { Debt } from 'src/debt/entities/debt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, JittaCardWallet, EarnWallet, User, DebtType, Debt]),
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
