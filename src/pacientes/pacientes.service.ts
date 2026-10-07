import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Paciente } from './paciente.model.js';
import { CreatePacienteDto, UpdatePacienteDto } from './paciente.dto.js';

@Injectable()
export class PacientesService {
  private pacientes: Paciente[] = [
    {
      id: '1',
      nombre: 'Juanita',
      documento: '1085000111',
      telefono: '3001112233',
      email: 'juanita@correo.com',
      fechaNacimiento: '1995-05-12',
      tipoSangre: 'O+',
      antecedentesClinicos: 'Ninguno'
    },
    {
      id: '2',
      nombre: 'Carlos',
      documento: '1085000222',
      telefono: '3102223344',
      email: 'carlos@correo.com',
      fechaNacimiento: '1988-11-23',
      tipoSangre: 'A-',
      antecedentesClinicos: 'Hipertensión'
    },
    {
      id: '3',
      nombre: 'Ana',
      documento: '1085000333',
      telefono: '3123334455',
      email: 'ana.gomez@correo.com',
      fechaNacimiento: '2001-02-15',
      tipoSangre: 'B+',
      antecedentesClinicos: 'Alergia a la penicilina'
    }
  ];

  findAll() {
    return this.pacientes;
  }

  findById(id: string) {
    console.log('.:: Paciente ID: ', id);
    const paciente = this.pacientes.find((paciente) => paciente.id === id);
    console.log('.:: paciente buscado: ', paciente);
    
    if (paciente === undefined) {
      throw new NotFoundException(`Paciente con ID ${id} no existe`);
    }

    if (paciente.id === '1') {
      throw new ForbiddenException(
        `No tienes permisos para acceder al paciente con ID ${id}`,
      );
    }
    return paciente;
  }

  findByName(nombre: string) {
    const data = this.pacientes.find((paciente) => paciente.nombre === nombre);
    if (!data) {
      throw new NotFoundException(`Paciente con nombre ${nombre} no existe`);
    }
    return { result: data?.email };
  }

  create(pacientePayload: CreatePacienteDto) {
    console.log('.:: paciente: ', pacientePayload);

    const newPaciente = {
      ...pacientePayload,
      id: `${new Date().getTime()}`,
      codigoPaciente: pacientePayload.nombre.substring(0, 3) + '123'
    };
    this.pacientes.push(newPaciente);

    return {
      message: 'Paciente creado correctamente',
      data: pacientePayload,
    };
  }

  delete(id: string) {
    const position = this.pacientes.findIndex((paciente) => paciente.id === id);
    if (position === -1) {
      throw new NotFoundException(`Paciente con ID ${id} no existe`);
    }
    this.pacientes.splice(position, 1);
    return {
      msg: 'Paciente eliminado correctamente',
    };
  }

  update(id: string, changes: UpdatePacienteDto) {
    const position = this.pacientes.findIndex((paciente) => paciente.id === id);
    if (position === -1) {
      throw new NotFoundException(`Paciente con ID ${id} no existe`);
    }
    const currentData = this.pacientes[position];
    const updatePaciente = {
      ...currentData,
      ...changes,
    };
    this.pacientes[position] = updatePaciente;

    return {
      msg: 'Paciente actualizado',
      data: updatePaciente,
    };
  }
}