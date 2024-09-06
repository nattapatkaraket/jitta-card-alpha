import { Transaction } from 'src/transaction/entities/transaction.entity';
import { EarnWallet } from '../entities/earn-wallet.entity';

export class EarnWalletDisplayResDto {
  userId: number;
  totalBalance: number;
  historys: Transaction[];
  earnWallets: EarnWallet[];
}
