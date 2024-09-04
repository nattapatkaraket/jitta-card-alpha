import { Test, TestingModule } from '@nestjs/testing';
import { EarnWalletService } from './earn-wallet.service';

describe('EarnWalletService', () => {
  let service: EarnWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarnWalletService],
    }).compile();

    service = module.get<EarnWalletService>(EarnWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
