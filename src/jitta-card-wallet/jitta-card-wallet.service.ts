import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JittaCardWallet } from './entities/jitta-card-wallet.entity';
import { Repository } from 'typeorm';
import { CreateJittaCardWalletDto } from './dto/create-jitta-card-wallet.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { UpdateJittaCardWalletDto } from './dto/update-jitta-card-wallet.dto';

@Injectable()
export class JittaCardWalletService {
  constructor(
    @InjectRepository(JittaCardWallet)
    private readonly jittaCardWalletRepo: Repository<JittaCardWallet>,
  ) {}

  async getByUserId(userId: number): Promise<JittaCardWallet> {
    return this.jittaCardWalletRepo.findOne({
      where: {
        userId,
      },
    });
  }

  async create(jittaCardWallet: CreateJittaCardWalletDto): Promise<CommonResponseDto> {
    const initJittaCardWallet = {
      userId: jittaCardWallet.userId,
      balance: 0,
      isRoundUp: false,
    };
    const newJittaCardWallet = this.jittaCardWalletRepo.create(initJittaCardWallet);
    const result = await this.jittaCardWalletRepo.save(newJittaCardWallet);

    if (result) {
      return {
        statusCode: 201,
        message: 'Jitta Card Wallet created successfully.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }

  async update(body: UpdateJittaCardWalletDto): Promise<CommonResponseDto> {
    const jittaCardWallet = await this.jittaCardWalletRepo.findOne({
      where: {
        id: body.id,
      },
    });

    if (!jittaCardWallet) {
      return {
        statusCode: 404,
        message: 'Jitta Card Wallet not found.',
      };
    }

    if (body.isRoundUp) jittaCardWallet.isRoundUp = body.isRoundUp;
    if (body.balance) jittaCardWallet.balance = body.balance;
    const result = await this.jittaCardWalletRepo.save(jittaCardWallet);

    if (result) {
      return {
        statusCode: 200,
        message: 'Jitta Card Wallet updated successfully.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }
}
