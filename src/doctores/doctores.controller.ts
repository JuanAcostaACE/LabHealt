import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DoctoresService } from './doctores.service.js';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto.js';

@Controller('doctores')
export class DoctoresController {
  constructor(private doctoresService: DoctoresService) {}

  @Get('')
  getAllDoctores() {
    return this.doctoresService.findAll();
  }

  @Get(':id')
  getDoctorById(@Param('id') id: string) {
    return this.doctoresService.findById(id);
  }

  @Get('search/:nombre')
  getDoctorByName(@Param('nombre') nombre: string) {
    return this.doctoresService.findByName(nombre);
  }

  @Post()
  createDoctor(@Body() doctorPayload: CreateDoctorDto) {
    return this.doctoresService.create(doctorPayload);
  }

  @Delete(':id')
  deleteDoctor(@Param('id') id: string) {
    return this.doctoresService.delete(id);
  }

  @Put(':id')
  updateDoctor(@Param('id') id: string, @Body() changes: UpdateDoctorDto) {
    return this.doctoresService.update(id, changes);
  }
}