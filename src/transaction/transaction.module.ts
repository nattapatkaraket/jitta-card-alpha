import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { JittaCardWalletModule } from 'src/jitta-card-wallet/jitta-card-wallet.module';
import { EarnWalletModule } from 'src/earn-wallet/earn-wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), JittaCardWalletModule, EarnWalletModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
