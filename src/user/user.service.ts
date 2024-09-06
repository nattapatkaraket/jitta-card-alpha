import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { LoginDto } from './dto/login.dto';
import { JittaCardWalletService } from 'src/jitta-card-wallet/jitta-card-wallet.service';
import { EarnWalletService } from 'src/earn-wallet/earn-wallet.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jittaCardWalletService: JittaCardWalletService,
    private readonly earnWalletService: EarnWalletService,
  ) {}

  async getById(id: number): Promise<User | CommonResponseDto> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      return {
        statusCode: 404,
        message: 'User not found.',
      };
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<CommonResponseDto> {
    // check if user already exists
    const userExists = await this.userRepo.findOne({
      where: {
        username: user.username,
      },
    });
    if (userExists) {
      throw new BadRequestException('User already exists.');
    }
    const newUser = this.userRepo.create(user);
    const result = await this.userRepo.save(newUser);
    const createJittaCardWalletResult = await this.jittaCardWalletService.create({
      userId: result.id,
      isOfficial: result.isOfficial,
    });
    const createEarnWalletResult = await this.earnWalletService.create({
      id: createJittaCardWalletResult.id,
      userId: result.id,
      isOfficial: result.isOfficial,
    });

    if (
      result &&
      createJittaCardWalletResult.statusCode === 201 &&
      createEarnWalletResult.statusCode === 201
    ) {
      return {
        statusCode: 201,
        message: 'User created successfully.',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Internal server error.',
      };
    }
  }

  async login(user: LoginDto) {
    const result = await this.userRepo.findOne({
      where: {
        username: user.username,
      },
    });
    if (result) {
      return {
        statusCode: 200,
        userId: result.id,
        message: 'Login successful.',
      };
    } else {
      return {
        statusCode: 401,
        userId: null,
        message: 'Invalid credentials.',
      };
    }
  }
}
