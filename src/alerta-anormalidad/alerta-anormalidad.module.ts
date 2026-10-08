import { Module } from '@nestjs/common';
import { AlertaAnormalidadController } from './alerta-anormalidad.controller.js';
import { AlertaAnormalidadService } from './alerta-anormalidad.service.js';

@Module({
  controllers: [AlertaAnormalidadController],
  providers: [AlertaAnormalidadService]
})
export class AlertaAnormalidadModule {}
