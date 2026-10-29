import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity.js';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto.js';

@Injectable()
export class DoctoresService {
  constructor(
    @InjectRepository(Doctor)
    private repo: Repository<Doctor>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Doctor con ID ${id} no existe`);
    }
    return entity;
  }

  async findByName(nombre: string) {
    const data = await this.repo.findOneBy({ nombre });
    if (!data) {
      throw new NotFoundException(`Doctor con nombre ${nombre} no existe`);
    }
    return { result: data.email };
  }

  async create(payload: CreateDoctorDto) {
    const saved = await this.repo.save(
      this.repo.create({ ...payload, codigoDoctor: payload.nombre.substring(0, 3) + '123' }),
    );
    return {
      message: 'Doctor creado correctamente',
      data: saved,
    };
  }

  async delete(id: number) {
    const { affected } = await this.repo.delete(id);
    if (!affected) {
      throw new NotFoundException(`Doctor con ID ${id} no existe`);
    }
    return {
      msg: 'Doctor eliminado correctamente',
    };
  }

  async update(id: number, changes: UpdateDoctorDto) {
    const current = await this.findById(id);
    const updated = await this.repo.save(Object.assign(current, changes));
    return {
      msg: 'Doctor actualizado',
      data: updated,
    };
  }
}
