import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { DebtTypeModule } from 'src/debt-type/debt-type.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Debt]), DebtTypeModule, UserModule],
  providers: [DebtService],
  controllers: [DebtController],
  exports: [DebtService],
})
export class DebtModule {}
