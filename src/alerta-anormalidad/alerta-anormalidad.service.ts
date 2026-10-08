import { Injectable, NotFoundException } from '@nestjs/common';
import { Alerta, NivelAlerta } from './alerta.model.js';
import { CreateAlertaDto, UpdateAlertaDto } from './alerta.dto.js';

@Injectable()
export class AlertaAnormalidadService {
    private alertas: Alerta[] = [
        {
            id: '1',
            resultado: 'Anormal',
            mensaje: 'Resultado anormal detectado',
            nivel: NivelAlerta.Alto,
            codigoAlerta: 'ALERT-001'
        },
        {
            id: '2',
            resultado: 'Normal',
            mensaje: 'Resultado dentro de los parámetros normales',
            nivel: NivelAlerta.Bajo,
            codigoAlerta: 'ALERT-002'
        },
    ];

    findAll() {
        return this.alertas;
    }

    findById(id: string) {
        const alerta = this.alertas.find((alerta) => alerta.id === id);
        if (!alerta) {
            throw new NotFoundException(`Alerta con ID ${id} no existe`);
        }
        return alerta;
    }

    create(alertaPayload: CreateAlertaDto) {
        const newAlerta: Alerta = {
            ...alertaPayload,
            id: `${new Date().getTime()}`,
        };
        this.alertas.push(newAlerta);
        return newAlerta;
    }

    delete(id: string) {
        const index = this.alertas.findIndex((alerta) => alerta.id === id);
        if (index === -1) {
            throw new NotFoundException(`Alerta con ID ${id} no existe`);
        }
        const deletedAlerta = this.alertas.splice(index, 1)[0];
        return deletedAlerta;
    }

    update(id: string, alertaPayload: UpdateAlertaDto) {
        const index = this.alertas.findIndex((alerta) => alerta.id === id);
        if (index === -1) {
            throw new NotFoundException(`Alerta con ID ${id} no existe`);
        }
        const updatedAlerta: Alerta = {
            ...this.alertas[index],
            ...alertaPayload,
        };
        this.alertas[index] = updatedAlerta;
        return updatedAlerta;
    }

}
