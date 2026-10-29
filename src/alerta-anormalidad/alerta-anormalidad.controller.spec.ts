import { getRepositoryToken } from '@nestjs/typeorm';
import { Alerta } from './entities/alerta.entity.js';
import { Test, TestingModule } from '@nestjs/testing';
import { AlertaAnormalidadController } from './alerta-anormalidad.controller.js';
import { AlertaAnormalidadService } from './alerta-anormalidad.service.js';

describe('AlertaAnormalidadController', () => {
  let controller: AlertaAnormalidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertaAnormalidadController],
      providers: [AlertaAnormalidadService, { provide: getRepositoryToken(Alerta), useValue: {} }],
    }).compile();

    controller = module.get<AlertaAnormalidadController>(AlertaAnormalidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
