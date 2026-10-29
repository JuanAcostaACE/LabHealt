import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity.js';
import { Paciente } from '../pacientes/entities/paciente.entity.js';
import { Doctor } from '../doctores/entities/doctor.entity.js';
import { HistoriasClinicasController } from './historias-clinicas.controller.js';
import { HistoriasClinicasService } from './historias-clinicas.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica, Paciente, Doctor])],
  controllers: [HistoriasClinicasController],
  providers: [HistoriasClinicasService],
  exports: [HistoriasClinicasService],
})
export class HistoriasClinicasModule {}
