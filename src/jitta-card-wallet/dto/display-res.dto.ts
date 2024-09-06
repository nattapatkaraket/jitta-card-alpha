import { DebtEntity } from 'src/debt/entities/debt.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { JittaCardWallet } from '../entities/jitta-card-wallet.entity';

export class DisplayResDto {
  userId: number;
  totalBalance: number;
  totalDebt: number;
  historys: Transaction[];
  debts: DebtEntity[];
  jittaCardWallets: JittaCardWallet[];
}
