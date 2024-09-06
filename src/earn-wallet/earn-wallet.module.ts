import { Module } from '@nestjs/common';
import { EarnWalletService } from './earn-wallet.service';
import { EarnWalletController } from './earn-wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EarnWallet } from './entities/earn-wallet.entity';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([EarnWallet]), TransactionModule],
  providers: [EarnWalletService],
  controllers: [EarnWalletController],
  exports: [EarnWalletService],
})
export class EarnWalletModule {}
