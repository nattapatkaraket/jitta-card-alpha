import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { JittaCardWalletService } from './jitta-card-wallet.service';
import { JittaCardWallet } from './entities/jitta-card-wallet.entity';
import { CreateJittaCardWalletDto } from './dto/create-jitta-card-wallet.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateJittaCardWalletDto } from './dto/update-jitta-card-wallet.dto';

@ApiTags('jitta-card-wallet')
@Controller('jitta-card-wallet')
export class JittaCardWalletController {
  constructor(private readonly jittaCardWalletService: JittaCardWalletService) {}

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: number): Promise<JittaCardWallet> {
    return this.jittaCardWalletService.getByUserId(userId);
  }

  @Post()
  async create(@Body() jittaCardWallet: CreateJittaCardWalletDto): Promise<CommonResponseDto> {
    return this.jittaCardWalletService.create(jittaCardWallet);
  }

  @Patch()
  async update(@Body() body: UpdateJittaCardWalletDto): Promise<CommonResponseDto> {
    return this.jittaCardWalletService.update(body);
  }
}
