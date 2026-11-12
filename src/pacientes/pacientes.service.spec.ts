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

  describe('findHistoriesById', () => {
    it('should return the patient histories with their count', async () => {
      repo.findOne.mockResolvedValue({ id: 1, histories: [{ id: 10 }, { id: 11 }] });

      await expect(service.findHistoriesById(1)).resolves.toEqual({
        data: [{ id: 10 }, { id: 11 }],
        count: 2,
      });
    });

    it('should throw NotFoundException when the patient does not exist', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findHistoriesById(99)).rejects.toThrow(NotFoundException);
    });
  });
});
