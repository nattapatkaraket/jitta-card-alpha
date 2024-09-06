import { EarnWallet } from '../entities/earn-wallet.entity';

// total balance from array of earn wallet
export const totalEarnBalance = (earnWallets: EarnWallet[]): number => {
  return earnWallets.reduce((sum, earnWallet) => {
    return sum + earnWallet.balance;
  }, 0);
};
