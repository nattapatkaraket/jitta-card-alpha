import { Module } from '@nestjs/common';
import { DebtTypeService } from './debt-type.service';
import { DebtTypeController } from './debt-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtTypeEntity } from './entites/debt-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtTypeEntity])],
  providers: [DebtTypeService],
  controllers: [DebtTypeController],
  exports: [DebtTypeService],
})
export class DebtTypeModule {}
