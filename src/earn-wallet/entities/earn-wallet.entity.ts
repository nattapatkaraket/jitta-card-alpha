import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// same as jitta card wallet entity
@Entity()
export class EarnWallet {
  @PrimaryColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  balance: number;

  @Column({ default: false })
  isMain: boolean;

  @Column({ default: false })
  isOfficial: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
