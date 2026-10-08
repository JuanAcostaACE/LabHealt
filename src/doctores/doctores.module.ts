import { Module } from '@nestjs/common';
import { DoctoresController } from './doctores.controller.js';
import { DoctoresService } from './doctores.service.js';

@Module({
  controllers: [DoctoresController],
  providers: [DoctoresService],
  exports: [DoctoresService],
})
export class DoctoresModule {}
