import { JittaCardWallet } from '../entities/jitta-card-wallet.entity';

// total balance from array of jitta card
export const totalJittaBalance = (jittaCardWallets: JittaCardWallet[]): number => {
  return jittaCardWallets.reduce((acc, jittaCardWallet) => {
    return acc + jittaCardWallet.balance;
  }, 0);
};
