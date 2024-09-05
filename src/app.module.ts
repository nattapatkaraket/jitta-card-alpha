import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JittaCardWalletModule } from './jitta-card-wallet/jitta-card-wallet.module';
import { EarnWalletModule } from './earn-wallet/earn-wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { DebtModule } from './debt/debt.module';
import { DebtTypeModule } from './debt-type/debt-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
    }),
    UserModule,
    JittaCardWalletModule,
    EarnWalletModule,
    TransactionModule,
    DebtModule,
    DebtTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
