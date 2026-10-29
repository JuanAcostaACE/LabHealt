import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity.js';
import { Paciente } from '../pacientes/entities/paciente.entity.js';
import { Doctor } from '../doctores/entities/doctor.entity.js';
import { CreateHistoriaClinicaDto, UpdateHistoriaClinicaDto } from './historia-clinica.dto.js';

@Injectable()
export class HistoriasClinicasService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private repo: Repository<HistoriaClinica>,
    @InjectRepository(Paciente)
    private pacientes: Repository<Paciente>,
    @InjectRepository(Doctor)
    private doctores: Repository<Doctor>,
  ) {}

  private async assertRelations(pacienteId: number, doctorId: number) {
    if (!(await this.pacientes.existsBy({ id: pacienteId }))) {
      throw new BadRequestException(`Paciente con ID ${pacienteId} no existe`);
    }
    if (!(await this.doctores.existsBy({ id: doctorId }))) {
      throw new BadRequestException(`Doctor con ID ${doctorId} no existe`);
    }
  }

  findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    const historia = await this.repo.findOneBy({ id });
    if (!historia) {
      throw new NotFoundException(`Historia clínica con ID ${id} no existe`);
    }
    return historia;
  }

  async findByDiagnostico(diagnostico: string) {
    const data = await this.repo.findOneBy({ diagnostico });
    if (!data) {
      throw new NotFoundException(`Historia clínica con diagnóstico ${diagnostico} no existe`);
    }
    return { result: data.tratamiento };
  }

  async create(historiaPayload: CreateHistoriaClinicaDto) {
    await this.assertRelations(historiaPayload.pacienteId, historiaPayload.doctorId);
    const saved = await this.repo.save(
      this.repo.create({
        ...historiaPayload,
        codigoHistoria: historiaPayload.diagnostico.substring(0, 3) + '123',
      }),
    );
    return {
      message: 'Historia clínica creada correctamente',
      data: saved,
    };
  }

  async delete(id: number) {
    const { affected } = await this.repo.delete(id);
    if (!affected) {
      throw new NotFoundException(`Historia clínica con ID ${id} no existe`);
    }
    return {
      msg: 'Historia clínica eliminada correctamente',
    };
  }

  async update(id: number, changes: UpdateHistoriaClinicaDto) {
    const current = await this.findById(id);
    await this.assertRelations(changes.pacienteId, changes.doctorId);
    const updated = await this.repo.save(Object.assign(current, changes));
    return {
      msg: 'Historia clínica actualizada',
      data: updated,
    };
  }
}
