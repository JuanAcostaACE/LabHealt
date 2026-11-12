import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerta } from './entities/alerta.entity.js';
import { HistoriaClinica } from '../historias-clinicas/entities/historia-clinica.entity.js';
import { CreateAlertaDto, UpdateAlertaDto } from './alerta.dto.js';

@Injectable()
export class AlertaAnormalidadService {
  constructor(
    @InjectRepository(Alerta)
    private repo: Repository<Alerta>,
    @InjectRepository(HistoriaClinica)
    private historias: Repository<HistoriaClinica>,
  ) {}

  private async assertHistoria(historiaId: number) {
    if (!(await this.historias.existsBy({ id: historiaId }))) {
      throw new BadRequestException(`Historia clínica con ID ${historiaId} no existe`);
    }
  }

  findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    const alerta = await this.repo.findOneBy({ id });
    if (!alerta) {
      throw new NotFoundException(`Alerta con ID ${id} no existe`);
    }
    return alerta;
  }

  async create(alertaPayload: CreateAlertaDto) {
    await this.assertHistoria(alertaPayload.historiaId);
    return this.repo.save(this.repo.create(alertaPayload));
  }

  async delete(id: number) {
    const alerta = await this.findById(id);
    return this.repo.remove(alerta);
  }

  async update(id: number, alertaPayload: UpdateAlertaDto) {
    const alerta = await this.findById(id);
    await this.assertHistoria(alertaPayload.historiaId ?? alerta.historiaId);
    return this.repo.save(Object.assign(alerta, alertaPayload));
  }
}
