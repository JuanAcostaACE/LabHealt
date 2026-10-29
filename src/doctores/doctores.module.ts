import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity.js';
import { DoctoresController } from './doctores.controller.js';
import { DoctoresService } from './doctores.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctoresController],
  providers: [DoctoresService],
  exports: [DoctoresService],
})
export class DoctoresModule {}
