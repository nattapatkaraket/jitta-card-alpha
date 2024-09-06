// function for checl loan limit
// can take loan if loan amount is less than 50% of sum of balance in Earn Wallet
// and calculate with 2 point of decimal (ex. 0.01)
import { totalEarnBalance } from 'src/earn-wallet/utils/helper';
import { Debt } from '../entities/debt.entity';
import { EarnWallet } from 'src/earn-wallet/entities/earn-wallet.entity';

// if the limit has more than 2 decimal point, it will be rounded up (ceiling) to 2 decimal point
export const checkLoanLimit = (
  loanAmount: number,
  earnWallet: EarnWallet[],
  debts: Debt[],
): boolean => {
  const limit = calculateLoanLimit(earnWallet, debts);
  const result = loanAmount <= limit;
  return result;
};

// function for calculate the limit of loan
export const calculateLoanLimit = (earnWallet: EarnWallet[], debts: Debt[]): number => {
  // final limit is 50% of balance and round up to 2 decimal place
  const unPaidDebt = totalUnpaidDebt(debts);
  const limit = Math.ceil((totalEarnBalance(earnWallet) / 2 - unPaidDebt) * 100) / 100;
  return limit;
};

export const totalUnpaidDebt = (debts: Debt[]): number => {
  return debts.reduce((totalDebt, debt) => totalDebt + debt.total - debt.paid, 0);
};

export const totalPaidDebt = (debts: Debt[]): number => {
  return debts.reduce((totalDebt, debt) => totalDebt + debt.paid, 0);
};
