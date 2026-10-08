import { Test, TestingModule } from '@nestjs/testing';
import { AlertaAnormalidadService } from './alerta-anormalidad.service.js';

describe('AlertaAnormalidadService', () => {
  let service: AlertaAnormalidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertaAnormalidadService],
    }).compile();

    service = module.get<AlertaAnormalidadService>(AlertaAnormalidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
