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
  `,
  })
  @Post()
  async createTransaction(@Body() body: CreateTransactionDto): Promise<CommonResponseDto> {
    return this.transactionService.create(body);
  }
}
