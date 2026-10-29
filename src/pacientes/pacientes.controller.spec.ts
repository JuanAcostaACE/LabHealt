import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity.js';
import { Test, TestingModule } from '@nestjs/testing';
import { PacientesController } from './pacientes.controller.js';
import { PacientesService } from './pacientes.service.js';

describe('PacientesController', () => {
  let controller: PacientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacientesController],
      providers: [PacientesService, { provide: getRepositoryToken(Paciente), useValue: {} }],
    }).compile();

    controller = module.get<PacientesController>(PacientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});