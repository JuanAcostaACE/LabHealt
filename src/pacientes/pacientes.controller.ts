import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePacienteDto, UpdatePacienteDto } from './paciente.dto.js';

interface Paciente {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  tipoSangre: string;
  antecedentesClinicos: string;
  codigoPaciente?: string;
}

@Controller('pacientes')
export class PacientesController {
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

  @Get('')
  getAllPacientes() {
    return this.pacientes;
  }

  @Get(':id')
  getPacienteById(@Param('id') id: string) {
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

  @Get('search/:nombre')
  getPacienteByName(@Param('nombre') nombre: string) {
    const data = this.pacientes.find((paciente) => paciente.nombre === nombre);
    if (!data) {
      throw new NotFoundException(`Paciente con nombre ${nombre} no existe`);
    }
    return { result: data?.email };
  }

  @Post()
  createPaciente(@Body() pacientePayload: CreatePacienteDto) {
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

  @Delete(':id')
  deletePaciente(@Param('id') id: string) {
    const position = this.pacientes.findIndex((paciente) => paciente.id === id);
    if (position === -1) {
      throw new NotFoundException(`Paciente con ID ${id} no existe`);
    }
    this.pacientes.splice(position, 1);
    return {
      msg: 'Paciente eliminado correctamente',
    };
  }

  @Put(':id')
  updatePaciente(@Param('id') id: string, @Body() changes: UpdatePacienteDto) {
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