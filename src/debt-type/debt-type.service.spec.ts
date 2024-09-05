import { Test, TestingModule } from '@nestjs/testing';
import { DebtTypeService } from './debt-type.service';

describe('DebtTypeService', () => {
  let service: DebtTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtTypeService],
    }).compile();

    service = module.get<DebtTypeService>(DebtTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
