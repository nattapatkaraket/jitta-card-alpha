import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JittaCardWalletModule } from 'src/jitta-card-wallet/jitta-card-wallet.module';
import { EarnWalletModule } from 'src/earn-wallet/earn-wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JittaCardWalletModule, EarnWalletModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
