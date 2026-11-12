import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alerta } from './entities/alerta.entity.js';
import { HistoriaClinica } from '../historias-clinicas/entities/historia-clinica.entity.js';
import { AlertaAnormalidadController } from './alerta-anormalidad.controller.js';
import { AlertaAnormalidadService } from './alerta-anormalidad.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Alerta, HistoriaClinica])],
  controllers: [AlertaAnormalidadController],
  providers: [AlertaAnormalidadService],
  exports: [AlertaAnormalidadService],
})
export class AlertaAnormalidadModule {}
