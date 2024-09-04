import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EarnWalletService } from './earn-wallet.service';
import { EarnWallet } from './entities/earn-wallet.entity';
import { CreateEarnWalletDto } from './dto/create-jitta-card-wallet.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithDrawDto } from './dto/withdraw.dto';

@ApiTags('earn-wallet')
@Controller('earn-wallet')
export class EarnWalletController {
  constructor(private readonly earnWalletService: EarnWalletService) {}

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: number): Promise<EarnWallet> {
    return this.earnWalletService.getByUserId(userId);
  }

  @Post()
  async create(@Body() body: CreateEarnWalletDto): Promise<CommonResponseDto> {
    return this.earnWalletService.create(body);
  }

  @Patch('deposit')
  async deposit(@Body() body: DepositDto): Promise<CommonResponseDto> {
    return this.earnWalletService.deposit(body);
  }

  @Patch('withdraw')
  async withdraw(@Body() body: WithDrawDto): Promise<CommonResponseDto> {
    return this.earnWalletService.withdraw(body);
  }
}
