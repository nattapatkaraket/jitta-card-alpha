import { Module } from '@nestjs/common';
import { EarnWalletService } from './earn-wallet.service';
import { EarnWalletController } from './earn-wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EarnWallet } from './entities/earn-wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EarnWallet])],
  providers: [EarnWalletService],
  controllers: [EarnWalletController],
  exports: [EarnWalletService],
})
export class EarnWalletModule {}
