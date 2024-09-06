import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EarnWalletService } from './earn-wallet.service';
import { EarnWallet } from './entities/earn-wallet.entity';
import { CreateEarnWalletDto } from './dto/create-earn-wallet.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { UpdateEarnWalletDto } from './dto/update-earn-wallet.dto';
import { EarnWalletDisplayResDto } from './dto/display-res.dto';

@ApiTags('earn-wallet')
@Controller('earn-wallet')
export class EarnWalletController {
  constructor(private readonly earnWalletService: EarnWalletService) {}

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: number): Promise<EarnWallet[]> {
    return this.earnWalletService.getByUserId(userId);
  }

  @Get('display/:userId')
  async display(@Param('userId') userId: number): Promise<EarnWalletDisplayResDto> {
    return this.earnWalletService.display(userId);
  }

  @Post()
  async create(@Body() body: CreateEarnWalletDto): Promise<CommonResponseDto> {
    return this.earnWalletService.create(body);
  }

  @Patch()
  async update(@Body() body: UpdateEarnWalletDto): Promise<CommonResponseDto> {
    return this.earnWalletService.update(body);
  }
}
