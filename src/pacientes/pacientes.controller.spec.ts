import { Test, TestingModule } from '@nestjs/testing';
import { PacientesController } from './pacientes.controller.js';
import { PacientesService } from './pacientes.service.js';

describe('PacientesController', () => {
  let controller: PacientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacientesController],
      providers: [PacientesService],
    }).compile();

    controller = module.get<PacientesController>(PacientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});