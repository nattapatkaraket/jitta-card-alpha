import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CommonResponseDto } from 'src/libs/common-dto/common-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

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
    if (result) {
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

  async login(user: LoginDto): Promise<CommonResponseDto> {
    const result = await this.userRepo.findOne({
      where: {
        username: user.username,
      },
    });
    if (result) {
      return {
        statusCode: 200,
        message: 'Login successful.',
      };
    } else {
      return {
        statusCode: 401,
        message: 'Invalid credentials.',
      };
    }
  }
}
