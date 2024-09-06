import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EarnWallet } from './entities/earn-wallet.entity';
import { Repository } from 'typeorm';
import { CreateEarnWalletDto } from './dto/create-earn-wallet.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { UpdateEarnWalletDto } from './dto/update-earn-wallet.dto';

@Injectable()
export class EarnWalletService {
  constructor(
    @InjectRepository(EarnWallet)
    private readonly earnWalletRepo: Repository<EarnWallet>,
  ) {}

  async getByUserId(userId: number): Promise<EarnWallet> {
    return this.earnWalletRepo.findOne({
      where: {
        userId,
      },
    });
  }

  async create(body: CreateEarnWalletDto): Promise<CommonResponseDto> {
    // check existing earn wallet
    const existingEarnWallet = await this.earnWalletRepo.findOne({
      where: {
        userId: body.userId,
      },
    });

    const initEarnWallet = {
      id: body.id,
      userId: body.userId,
      balance: 0,
      isMain: !existingEarnWallet,
      isOfficial: body.isOfficial,
    };
    const newEarnWallet = this.earnWalletRepo.create(initEarnWallet);
    const result = await this.earnWalletRepo.save(newEarnWallet);

    if (result) {
      return {
        statusCode: 201,
        message: 'Earn Wallet created successfully.',
      };
    } else {
      return {
        statusCode: 400,
        message: 'Cannot create Earn Wallet.',
      };
    }
  }

  async update(body: UpdateEarnWalletDto): Promise<CommonResponseDto> {
    const earnWallet = await this.earnWalletRepo.findOne({
      where: {
        id: body.id,
      },
    });

    if (!earnWallet) {
      return {
        statusCode: 404,
        message: 'Earn Wallet not found.',
      };
    }

    const result = await this.earnWalletRepo.update(earnWallet.id, earnWallet);

    if (result) {
      return {
        statusCode: 200,
        message: 'Earn Wallet updated successfully.',
      };
    } else {
      return {
        statusCode: 400,
        message: 'Cannot update Earn Wallet.',
      };
    }
  }
}
