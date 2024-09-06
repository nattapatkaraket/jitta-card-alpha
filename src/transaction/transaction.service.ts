import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  FromType,
  ToType,
  TransactionStatusType,
  TransactionType,
} from './models/transaction.enum';
import { JittaCardWallet } from 'src/jitta-card-wallet/entities/jitta-card-wallet.entity';
import { EarnWallet } from 'src/earn-wallet/entities/earn-wallet.entity';
import { User } from 'src/user/entities/user.entity';
import { TransactionStatus } from './models/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(JittaCardWallet)
    private readonly jittaCardWalletRepo: Repository<JittaCardWallet>,
    @InjectRepository(EarnWallet)
    private readonly earnWalletRepo: Repository<EarnWallet>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async getTransactionByUserId(userId: number): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: {
        userId,
      },
    });
  }

  async MakeDeposit(body: CreateTransactionDto): Promise<TransactionStatus> {
    // handle deposit validation
    if (body.from !== FromType.OUTSIDE) return TransactionStatusType.INVALID_FROM_TYPE;
    if (body.to !== ToType.JITTACARD_WALLET) return TransactionStatusType.INVALID_TO_TYPE;
    // wallet exist
    const wallet = await this.jittaCardWalletRepo.findOne({
      where: {
        id: body.toValue,
      },
    });
    if (!wallet) return TransactionStatusType.JITTA_WALLET_NOT_FOUND;

    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newTransaction = queryRunner.manager.create(Transaction, {
        userId: body.userId,
        amount: body.amount,
        from: body.from,
        fromValue: body.fromValue,
        to: body.to,
        toValue: body.toValue,
        transactionType: body.transactionType,
      });
      await queryRunner.manager.save(newTransaction);

      await queryRunner.manager.update(JittaCardWallet, body.toValue, {
        balance: wallet.balance + body.amount,
      });

      await queryRunner.commitTransaction();
      return TransactionStatusType.SUCCESS;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return TransactionStatusType.FAIL;
    } finally {
      await queryRunner.release();
    }
  }

  async MakeWithdraw(body: CreateTransactionDto): Promise<TransactionStatus> {
    // handle withdraw validation
    if (body.from !== FromType.JITTACARD_WALLET) return TransactionStatusType.INVALID_FROM_TYPE;
    if (body.to !== ToType.OUTSIDE) return TransactionStatusType.INVALID_TO_TYPE;
    // wallet exist
    const wallet = await this.jittaCardWalletRepo.findOne({
      where: {
        id: body.fromValue,
      },
    });
    if (!wallet) return TransactionStatusType.JITTA_WALLET_NOT_FOUND;
    // check balance
    if (wallet.balance < body.amount) return TransactionStatusType.INSUFFICIENT_BALANCE;

    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newTransaction = queryRunner.manager.create(Transaction, {
        userId: body.userId,
        amount: body.amount,
        from: body.from,
        fromValue: body.fromValue,
        to: body.to,
        toValue: body.toValue,
        transactionType: body.transactionType,
      });
      await queryRunner.manager.save(newTransaction);

      await queryRunner.manager.update(JittaCardWallet, body.fromValue, {
        balance: wallet.balance - body.amount,
      });

      await queryRunner.commitTransaction();
      return TransactionStatusType.SUCCESS;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return TransactionStatusType.FAIL;
    } finally {
      await queryRunner.release();
    }
  }

  async MakeTransfer(body: CreateTransactionDto): Promise<TransactionStatus> {
    // handle transfer validation
    if (body.from !== FromType.JITTACARD_WALLET) return TransactionStatusType.INVALID_FROM_TYPE;
    if (body.to !== ToType.JITTACARD_WALLET) return TransactionStatusType.INVALID_TO_TYPE;
    // wallet exist
    const fromWallet = await this.jittaCardWalletRepo.findOne({
      where: {
        id: body.fromValue,
      },
    });
    const toWallet = await this.jittaCardWalletRepo.findOne({
      where: {
        id: body.toValue,
      },
    });
    if (!fromWallet || !toWallet) return TransactionStatusType.JITTA_WALLET_NOT_FOUND;
    // check balance
    if (fromWallet.balance < body.amount) return TransactionStatusType.INSUFFICIENT_BALANCE;

    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newTransaction = queryRunner.manager.create(Transaction, {
        userId: body.userId,
        amount: body.amount,
        from: body.from,
        fromValue: body.fromValue,
        to: body.to,
        toValue: body.toValue,
        transactionType: body.transactionType,
      });
      await queryRunner.manager.save(newTransaction);

      await queryRunner.manager.update(JittaCardWallet, body.fromValue, {
        balance: fromWallet.balance - body.amount,
      });

      await queryRunner.manager.update(JittaCardWallet, body.toValue, {
        balance: toWallet.balance + body.amount,
      });

      await queryRunner.commitTransaction();
      return TransactionStatusType.SUCCESS;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return TransactionStatusType.FAIL;
    } finally {
      await queryRunner.release();
    }
  }

  async makePayment(body: CreateTransactionDto): Promise<TransactionStatus> {
    // handle payment validation
    if (body.from !== FromType.JITTACARD_WALLET) return TransactionStatusType.INVALID_FROM_TYPE;
    if (body.to !== ToType.OUTSIDE) return TransactionStatusType.INVALID_TO_TYPE;
    // wallet exist & round up check
    const jittaCardWallet = await this.jittaCardWalletRepo.findOne({
      where: {
        id: body.fromValue,
      },
    });
    let earnWallet: EarnWallet;
    if (!jittaCardWallet) return TransactionStatusType.JITTA_WALLET_NOT_FOUND;
    if (jittaCardWallet.isRoundUp) {
      // check earn wallet exist
      earnWallet = await this.earnWalletRepo.findOne({
        where: {
          userId: body.userId,
        },
      });
      if (!earnWallet) return TransactionStatusType.EARN_WALLET_NOT_FOUND;
    }
    // check balance
    let roundUpAmount = 0;
    if (jittaCardWallet.isRoundUp) {
      // round up only % 100 != 0
      roundUpAmount = body.amount % 100 === 0 ? 0 : 100 - (body.amount % 100);
      if (jittaCardWallet.balance < body.amount + roundUpAmount)
        return TransactionStatusType.INSUFFICIENT_BALANCE;
    } else {
      if (jittaCardWallet.balance < body.amount) return TransactionStatusType.INSUFFICIENT_BALANCE;
    }
    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newTransaction = queryRunner.manager.create(Transaction, {
        userId: body.userId,
        amount: body.amount,
        from: body.from,
        fromValue: body.fromValue,
        to: body.to,
        toValue: body.toValue,
        transactionType: body.transactionType,
      });
      await queryRunner.manager.save(newTransaction);
      // payment (make payment) logic here
      // this payment method is just a placeholder

      // update balance
      if (jittaCardWallet.isRoundUp) {
        await Promise.all([
          queryRunner.manager.update(JittaCardWallet, body.fromValue, {
            balance: jittaCardWallet.balance - (body.amount + roundUpAmount),
          }),
          // update earn wallet with difference amount and round up amount
          queryRunner.manager.update(EarnWallet, earnWallet.id, {
            balance: earnWallet.balance + roundUpAmount,
          }),
        ]);
      } else {
        await queryRunner.manager.update(JittaCardWallet, body.fromValue, {
          balance: jittaCardWallet.balance - body.amount,
        });
      }
      await queryRunner.commitTransaction();
      return TransactionStatusType.SUCCESS;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return TransactionStatusType.FAIL;
    } finally {
      await queryRunner.release();
    }
  }

  async create(body: CreateTransactionDto): Promise<CommonResponseDto> {
    // validate bad request
    // user exist
    const user = await this.userRepo.findOne({
      where: {
        id: body.userId,
      },
    });
    if (!user) {
      return {
        statusCode: 404,
        message: 'User not found',
      };
    }

    // start make the transaction
    let transactionStatus: TransactionStatus = {
      isTransactionSuccess: false,
      message: '',
    };
    switch (body.transactionType) {
      case TransactionType.DEPOSIT:
        transactionStatus = await this.MakeDeposit(body);
        break;
      case TransactionType.WITHDRAW:
        transactionStatus = await this.MakeWithdraw(body);
        break;
      case TransactionType.TRANSFER:
        transactionStatus = await this.MakeTransfer(body);
        break;
      case TransactionType.PAY:
        transactionStatus = await this.makePayment(body);
        break;
      default:
        transactionStatus = TransactionStatusType.INVALID_TRANSACTION_TYPE;
        break;
    }

    if (transactionStatus.isTransactionSuccess === true) {
      return {
        statusCode: 201,
        message: transactionStatus.message,
      };
    } else {
      return {
        statusCode: 400,
        message: transactionStatus.message,
      };
    }
  }
}
