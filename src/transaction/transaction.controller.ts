import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({
    summary: 'Create transaction',
    description: `
     # transaction type
     1. ฝากเงิน (deposit)
     2. ถอนเงิน (withdraw)
     3. จ่ายเงิน (pay) -> round up
     4. โอนเงิน (transfer)
     5. ยิมเงิน (loan)
     6. ชำระหนี้ (debt payment)

     # from type and to type
     1. JittaCardWallet
     2. EarnWallet
     3. Outside
     4. Debt

     # example 
     1. deposit: {
        "userId": 1,
        "amount": 100,
        "from": "Outside",
        "fromValue": -1,
        "to": "JittaCardWallet",
        "toValue": 1,
        "transactionType": "deposit"
      }
    2. withdraw: {
        "userId": 1,
        "amount": 100,
        "from": "JittaCardWallet",
        "fromValue": 1,
        "to": "Outside",
        "toValue": -1,
        "transactionType": "withdraw"
      }
    3. pay: {
        "userId": 1,
        "amount": 100,
        "from": "JittaCardWallet",
        "fromValue": 1,
        "to": "Outside",
        "toValue": -1,
        "transactionType": "pay"
      }
    4. transfer: {
        "userId": 1,
        "amount": 100,
        "from": "JittaCardWallet",
        "fromValue": 1,
        "to": "JittaCardWallet",
        "toValue": 2,
        "transactionType": "transfer"
      }
    5. loan: {  
        "userId": 1,
        "amount": 100,
        "from": "JittaCardWallet",
        // 3 is Jitta Wallet (if -1 means loan from official account => backend auto select the account)
        "fromValue": 3, 
        "to": "JittaCardWallet",
        "toValue": 1,
        "debtTypeId": 1,
        "transactionType": "loan"
      }
    6. debt payment: {
        "userId": 1,
        "amount": 100,
        "from": "JittaCardWallet",
        "fromValue": 1,
        "to": "Debt",
        "toValue": 1, // debt id
        "debtTypeId": 1,
        "transactionType": "debt payment"
      }
  `,
  })
  @Post()
  async createTransaction(@Body() body: CreateTransactionDto): Promise<CommonResponseDto> {
    return this.transactionService.create(body);
  }
}
