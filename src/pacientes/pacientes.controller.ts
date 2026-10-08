import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PacientesService } from './pacientes.service.js';
import { CreatePacienteDto, UpdatePacienteDto } from './paciente.dto.js';

@Controller('pacientes')
export class PacientesController {
  constructor(private pacientesService: PacientesService) {}

  @Get('')
  getAllPacientes() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  getPacienteById(@Param('id') id: string) {
    return this.pacientesService.findById(id);
  }

  @Get('search/:nombre')
  getPacienteByName(@Param('nombre') nombre: string) {
    return this.pacientesService.findByName(nombre);
  }

  @Post()
  createPaciente(@Body() pacientePayload: CreatePacienteDto) {
    return this.pacientesService.create(pacientePayload);
  }

  @Delete(':id')
  deletePaciente(@Param('id') id: string) {
    return this.pacientesService.delete(id);
  }

  @Put(':id')
  updatePaciente(@Param('id') id: string, @Body() changes: UpdatePacienteDto) {
    return this.pacientesService.update(id, changes);
  }
}