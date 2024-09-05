import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtEntity } from './entities/debt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtEntity])],
  providers: [DebtService],
  controllers: [DebtController],
})
export class DebtModule {}
