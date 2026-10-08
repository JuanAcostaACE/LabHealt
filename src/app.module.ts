import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PacientesModule } from './pacientes/pacientes.module.js';
import { DoctoresModule } from './doctores/doctores.module.js';
import { HistoriasClinicasModule } from './historias-clinicas/historias-clinicas.module.js';
import { AlertaAnormalidadModule } from './alerta-anormalidad/alerta-anormalidad.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'LabHealt',
    }),
    PacientesModule,
    DoctoresModule,
    HistoriasClinicasModule,
    AlertaAnormalidadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
