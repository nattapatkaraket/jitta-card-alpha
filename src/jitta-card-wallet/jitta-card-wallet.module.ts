import { Module } from '@nestjs/common';
import { JittaCardWalletService } from './jitta-card-wallet.service';
import { JittaCardWalletController } from './jitta-card-wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JittaCardWallet } from './entities/jitta-card-wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JittaCardWallet])],
  providers: [JittaCardWalletService],
  controllers: [JittaCardWalletController],
})
export class JittaCardWalletModule {}
