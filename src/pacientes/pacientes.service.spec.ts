import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity.js';
import { Test, TestingModule } from '@nestjs/testing';
import { PacientesService } from './pacientes.service.js';

describe('PacientesService', () => {
  let service: PacientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacientesService, { provide: getRepositoryToken(Paciente), useValue: {} }],
    }).compile();

    service = module.get<PacientesService>(PacientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});