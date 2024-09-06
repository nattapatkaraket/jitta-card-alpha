import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Post('/login')
  @HttpCode(200)
  login(@Body() user: LoginDto) {
    return this.userService.login(user);
  }
}
