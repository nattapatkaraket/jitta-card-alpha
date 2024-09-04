import { Test, TestingModule } from '@nestjs/testing';
import { JittaCardWalletService } from './jitta-card-wallet.service';

describe('JittaCardWalletService', () => {
  let service: JittaCardWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JittaCardWalletService],
    }).compile();

    service = module.get<JittaCardWalletService>(JittaCardWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
