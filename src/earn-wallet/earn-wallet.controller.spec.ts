import { Test, TestingModule } from '@nestjs/testing';
import { EarnWalletController } from './earn-wallet.controller';

describe('EarnWalletController', () => {
  let controller: EarnWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarnWalletController],
    }).compile();

    controller = module.get<EarnWalletController>(EarnWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
