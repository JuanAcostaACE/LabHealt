import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { HistoriaClinica } from './historia-clinica.model.js';
import { CreateHistoriaClinicaDto, UpdateHistoriaClinicaDto } from './historia-clinica.dto.js';

@Injectable()
export class HistoriasClinicasService {
  private historias: HistoriaClinica[] = [
    {
      id: '1',
      pacienteId: '1085000111',
      doctorId: 'MED12345',
      fecha: '2026-10-06',
      diagnostico: 'Gripe severa',
      tratamiento: 'Reposo y acetaminofén',
      observaciones: 'Paciente presenta fiebre alta',
    },
    {
      id: '2',
      pacienteId: '1085000222',
      doctorId: 'MED67890',
      fecha: '2026-10-05',
      diagnostico: 'Migraña crónica',
      tratamiento: 'Ibuprofeno 800mg',
      observaciones: 'Sensibilidad a la luz',
    }
  ];

  findAll() {
    return this.historias;
  }

  findById(id: string) {
    console.log('.:: Historia ID: ', id);
    const historia = this.historias.find((h) => h.id === id);
    console.log('.:: historia buscada: ', historia);
    
    if (historia === undefined) {
      throw new NotFoundException(`Historia clínica con ID ${id} no existe`);
    }

    if (historia.id === '1') {
      throw new ForbiddenException(
        `No tienes permisos para acceder a la historia con ID ${id}`,
      );
    }
    return historia;
  }

  findByDiagnostico(diagnostico: string) {
    const data = this.historias.find((h) => h.diagnostico === diagnostico);
    if (!data) {
      throw new NotFoundException(`Historia clínica con diagnóstico ${diagnostico} no existe`);
    }
    return { result: data?.tratamiento };
  }

  create(historiaPayload: CreateHistoriaClinicaDto) {
    console.log('.:: historia: ', historiaPayload);

    const newHistoria = {
      ...historiaPayload,
      id: `${new Date().getTime()}`,
      codigoHistoria: historiaPayload.diagnostico.substring(0, 3) + '123'
    };
    this.historias.push(newHistoria);

    return {
      message: 'Historia clínica creada correctamente',
      data: historiaPayload,
    };
  }

  delete(id: string) {
    const position = this.historias.findIndex((h) => h.id === id);
    if (position === -1) {
      throw new NotFoundException(`Historia clínica con ID ${id} no existe`);
    }
    this.historias.splice(position, 1);
    return {
      msg: 'Historia clínica eliminada correctamente',
    };
  }

  update(id: string, changes: UpdateHistoriaClinicaDto) {
    const position = this.historias.findIndex((h) => h.id === id);
    if (position === -1) {
      throw new NotFoundException(`Historia clínica con ID ${id} no existe`);
    }
    const currentData = this.historias[position];
    const updateHistoria = {
      ...currentData,
      ...changes,
    };
    this.historias[position] = updateHistoria;

    return {
      msg: 'Historia clínica actualizada',
      data: updateHistoria,
    };
  }
}