import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AlertaAnormalidadService } from './alerta-anormalidad.service.js';
import { CreateAlertaDto, UpdateAlertaDto } from './alerta.dto.js';

@Controller('alerta-anormalidad')
export class AlertaAnormalidadController {
  constructor(private alertaService: AlertaAnormalidadService) {}

  @Get('')
  getAllAlertas() {
    return this.alertaService.findAll();
  }

  @Get(':id')
  getAlertaById(@Param('id') id: string) {
    return this.alertaService.findById(id);
  }

  @Post()
  createAlerta(@Body() alertaPayload: CreateAlertaDto) {
    return this.alertaService.create(alertaPayload);
  }

  @Delete(':id')
  deleteAlerta(@Param('id') id: string) {
    return this.alertaService.delete(id);
  }

  @Put(':id')
  updateAlerta(@Param('id') id: string, @Body() changes: UpdateAlertaDto) {
    return this.alertaService.update(id, changes);
  }
}
