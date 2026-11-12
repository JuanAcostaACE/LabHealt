import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity.js';
import { Test, TestingModule } from '@nestjs/testing';
import { PacientesService } from './pacientes.service.js';

describe('PacientesService', () => {
  let service: PacientesService;
  const repo = { findOne: vi.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacientesService, { provide: getRepositoryToken(Paciente), useValue: repo }],
    }).compile();

    service = module.get<PacientesService>(PacientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findHistoriasById', () => {
    it('devuelve las historias del paciente con su conteo', async () => {
      repo.findOne.mockResolvedValue({ id: 1, historias: [{ id: 10 }, { id: 11 }] });

      await expect(service.findHistoriasById(1)).resolves.toEqual({
        data: [{ id: 10 }, { id: 11 }],
        count: 2,
      });
    });

    it('lanza NotFoundException si el paciente no existe', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findHistoriasById(99)).rejects.toThrow(NotFoundException);
    });
  });
});
