import { getRepositoryToken } from '@nestjs/typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity.js';
import { Paciente } from '../pacientes/entities/paciente.entity.js';
import { Doctor } from '../doctores/entities/doctor.entity.js';
import { Test, TestingModule } from '@nestjs/testing';
import { HistoriasClinicasService } from './historias-clinicas.service.js';

describe('HistoriasClinicasService', () => {
  let service: HistoriasClinicasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoriasClinicasService, { provide: getRepositoryToken(HistoriaClinica), useValue: {} }, { provide: getRepositoryToken(Paciente), useValue: {} }, { provide: getRepositoryToken(Doctor), useValue: {} }],
    }).compile();

    service = module.get<HistoriasClinicasService>(HistoriasClinicasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});