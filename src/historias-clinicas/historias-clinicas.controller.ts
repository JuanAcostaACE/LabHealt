import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HistoriasClinicasService } from './historias-clinicas.service.js';
import { CreateHistoriaClinicaDto, UpdateHistoriaClinicaDto } from './historia-clinica.dto.js';

@Controller('historias-clinicas')
export class HistoriasClinicasController {
  constructor(private historiasService: HistoriasClinicasService) {}

  @Get('')
  getAllHistorias() {
    return this.historiasService.findAll();
  }

  @Get(':id')
  getHistoriaById(@Param('id') id: string) {
    return this.historiasService.findById(id);
  }

  @Get('search/:diagnostico')
  getHistoriaByDiagnostico(@Param('diagnostico') diagnostico: string) {
    return this.historiasService.findByDiagnostico(diagnostico);
  }

  @Post()
  createHistoria(@Body() historiaPayload: CreateHistoriaClinicaDto) {
    return this.historiasService.create(historiaPayload);
  }

  @Delete(':id')
  deleteHistoria(@Param('id') id: string) {
    return this.historiasService.delete(id);
  }

  @Put(':id')
  updateHistoria(@Param('id') id: string, @Body() changes: UpdateHistoriaClinicaDto) {
    return this.historiasService.update(id, changes);
  }
}