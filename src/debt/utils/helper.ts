// function for checl loan limit
// can take loan if loan amount is less than 50% of sum of balance in Jitta Card Wallet
// and calculate with 2 point of decimal (ex. 0.01)

import { JittaCardWallet } from 'src/jitta-card-wallet/entities/jitta-card-wallet.entity';
import { DebtEntity } from '../entities/debt.entity';

// if the limit has more than 2 decimal point, it will be rounded up (ceiling) to 2 decimal point
export const checkLoanLimit = (loanAmount: number, jittaWallet: JittaCardWallet): boolean => {
  // final limit is 50% of balance and round up to 2 decimal place
  const limit = Math.ceil((jittaWallet.balance / 2) * 100) / 100;
  const result = loanAmount <= limit;
  return result;
};

export const totalDebt = (debts: DebtEntity[]): number => {
  return debts.reduce((totalDebt, debt) => totalDebt + debt.total - debt.paid, 0);
};
