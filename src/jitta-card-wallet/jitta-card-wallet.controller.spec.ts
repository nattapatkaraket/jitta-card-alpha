import { Test, TestingModule } from '@nestjs/testing';
import { JittaCardWalletController } from './jitta-card-wallet.controller';

describe('JittaCardWalletController', () => {
  let controller: JittaCardWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JittaCardWalletController],
    }).compile();

    controller = module.get<JittaCardWalletController>(JittaCardWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
