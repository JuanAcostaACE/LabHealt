import { getRepositoryToken } from '@nestjs/typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity.js';
import { Paciente } from '../pacientes/entities/paciente.entity.js';
import { Doctor } from '../doctores/entities/doctor.entity.js';
import { Test, TestingModule } from '@nestjs/testing';
import { HistoriasClinicasController } from './historias-clinicas.controller.js';
import { HistoriasClinicasService } from './historias-clinicas.service.js';

describe('HistoriasClinicasController', () => {
  let controller: HistoriasClinicasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriasClinicasController],
      providers: [HistoriasClinicasService, { provide: getRepositoryToken(HistoriaClinica), useValue: {} }, { provide: getRepositoryToken(Paciente), useValue: {} }, { provide: getRepositoryToken(Doctor), useValue: {} }],
    }).compile();

    controller = module.get<HistoriasClinicasController>(HistoriasClinicasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});