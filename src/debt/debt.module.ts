import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { DebtTypeModule } from 'src/debt-type/debt-type.module';
import { UserModule } from 'src/user/user.module';
import { EarnWalletModule } from 'src/earn-wallet/earn-wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Debt]), DebtTypeModule, UserModule, EarnWalletModule],
  providers: [DebtService],
  controllers: [DebtController],
  exports: [DebtService],
})
export class DebtModule {}
