import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alerta } from './entities/alerta.entity.js';
import { AlertaAnormalidadController } from './alerta-anormalidad.controller.js';
import { AlertaAnormalidadService } from './alerta-anormalidad.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Alerta])],
  controllers: [AlertaAnormalidadController],
  providers: [AlertaAnormalidadService],
  exports: [AlertaAnormalidadService],
})
export class AlertaAnormalidadModule {}
