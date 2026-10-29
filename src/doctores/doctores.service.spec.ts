import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity.js';
import { Test, TestingModule } from '@nestjs/testing';
import { DoctoresService } from './doctores.service.js';

describe('DoctoresService', () => {
  let service: DoctoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctoresService, { provide: getRepositoryToken(Doctor), useValue: {} }],
    }).compile();

    service = module.get<DoctoresService>(DoctoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});