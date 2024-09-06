import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FromType, ToType, TransactionType } from '../models/transaction.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ default: 0 })
  amount: number;

  @Column({
    type: 'enum',
    enum: FromType,
    default: FromType.JITTACARD_WALLET,
  })
  from: FromType;

  @Column()
  fromValue: number;

  @Column({
    type: 'enum',
    enum: ToType,
    default: ToType.JITTACARD_WALLET,
  })
  to: ToType;

  @Column()
  toValue: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.DEPOSIT,
  })
  transactionType: TransactionType;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
