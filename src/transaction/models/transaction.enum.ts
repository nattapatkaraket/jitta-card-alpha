import { TransactionStatus } from './transaction.interface';

export enum TransactionType {
  // transaction meta data
  // 1. ฝากเงิน (deposit)
  // 2. ถอนเงิน (withdraw)
  // 3. จ่ายเงิน (pay) -> round up
  // 4. โอนเงิน (transfer)
  // 5. ยิมเงิน (loan)
  // 6. ชำระหนี้ (debt payment)

  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  PAY = 'pay',
  TRANSFER = 'transfer',
  LOAN = 'loan',
  DEBT_PAYMENT = 'debt payment',
}

export enum FromType {
  // 1. JittaCardWallet
  // 2. EarnWallet
  // 3. Outside
  // 4. Debt

  JITTACARD_WALLET = 'JittaCardWallet',
  EARN_WALLET = 'EarnWallet',
  OUTSIDE = 'Outside',
  DEBT = 'Debt',
}

export enum ToType {
  // 1. JittaCardWallet
  // 2. EarnWallet
  // 3. Outside
  // 4. Debt

  JITTACARD_WALLET = 'JittaCardWallet',
  EARN_WALLET = 'EarnWallet',
  OUTSIDE = 'Outside',
  DEBT = 'Debt',
}

export const TransactionStatusType = {
  SUCCESS: {
    isTransactionSuccess: true,
    message: 'Transaction success',
  },
  FAIL: {
    isTransactionSuccess: false,
    message: 'Transaction fail',
  },
  INVALID_FROM_TYPE: {
    isTransactionSuccess: false,
    message: 'Invalid FromType',
  },
  INVALID_TO_TYPE: {
    isTransactionSuccess: false,
    message: 'Invalid ToType',
  },
  INSUFFICIENT_BALANCE: {
    isTransactionSuccess: false,
    message: 'Insufficient balance',
  },
  JITTA_WALLET_NOT_FOUND: {
    isTransactionSuccess: false,
    message: 'Jitta Card Wallet not found',
  },
  EARN_WALLET_NOT_FOUND: {
    isTransactionSuccess: false,
    message: 'Earn Wallet not found',
  },
  INVALID_TRANSACTION_TYPE: {
    isTransactionSuccess: false,
    message: 'Invalid transaction type.',
  },
  LOAN_LIMIT_EXCEED: {
    isTransactionSuccess: false,
    message: 'Loan limit exceed',
  },
  DEBT_NOT_FOUND: {
    isTransactionSuccess: false,
    message: 'Debt not found',
  },
  DEBT_TYPE_NOT_FOUND: {
    isTransactionSuccess: false,
    message: 'Debt type not found',
  },
  DEBT_ALREADY_PAID: {
    isTransactionSuccess: false,
    message: 'Debt already paid',
  },
} as const;
