import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity.js';
import { CreatePacienteDto, UpdatePacienteDto } from './paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private repo: Repository<Paciente>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Paciente con ID ${id} no existe`);
    }
    return entity;
  }

  async findByName(nombre: string) {
    const data = await this.repo.findOneBy({ nombre });
    if (!data) {
      throw new NotFoundException(`Paciente con nombre ${nombre} no existe`);
    }
    return { result: data.email };
  }

  async create(payload: CreatePacienteDto) {
    const saved = await this.repo.save(
      this.repo.create({ ...payload, codigoPaciente: payload.nombre.substring(0, 3) + '123' }),
    );
    return {
      message: 'Paciente creado correctamente',
      data: saved,
    };
  }

  async delete(id: number) {
    const { affected } = await this.repo.delete(id);
    if (!affected) {
      throw new NotFoundException(`Paciente con ID ${id} no existe`);
    }
    return {
      msg: 'Paciente eliminado correctamente',
    };
  }

  async update(id: number, changes: UpdatePacienteDto) {
    const current = await this.findById(id);
    const updated = await this.repo.save(Object.assign(current, changes));
    return {
      msg: 'Paciente actualizado',
      data: updated,
    };
  }
}
