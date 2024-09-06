import { forwardRef, Module } from '@nestjs/common';
import { JittaCardWalletService } from './jitta-card-wallet.service';
import { JittaCardWalletController } from './jitta-card-wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JittaCardWallet } from './entities/jitta-card-wallet.entity';
import { TransactionModule } from 'src/transaction/transaction.module';
import { DebtEntity } from 'src/debt/entities/debt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JittaCardWallet, DebtEntity]), TransactionModule],
  providers: [JittaCardWalletService],
  controllers: [JittaCardWalletController],
  exports: [JittaCardWalletService],
})
export class JittaCardWalletModule {}
