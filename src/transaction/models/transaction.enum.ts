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
