import { Test, TestingModule } from '@nestjs/testing';
import { DebtTypeController } from './debt-type.controller';

describe('DebtTypeController', () => {
  let controller: DebtTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtTypeController],
    }).compile();

    controller = module.get<DebtTypeController>(DebtTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
