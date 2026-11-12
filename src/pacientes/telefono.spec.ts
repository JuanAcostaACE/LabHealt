import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';
import { CreatePacienteDto } from './paciente.dto.js';
import { CreateDoctorDto } from '../doctores/doctor.dto.js';

const pacienteBase = {
  nombre: 'Ana',
  documento: '1234567',
  email: 'ana@test.com',
  fechaNacimiento: '1995-04-12',
  tipoSangre: 'O+',
  antecedentesClinicos: 'ninguno',
};

const doctorBase = {
  nombre: 'Dr House',
  especialidad: 'General',
  licencia: 'LIC-1',
  email: 'house@test.com',
};

const erroresDeTelefono = async (dto: object) =>
  (await validate(dto)).filter((e) => e.property === 'telefono');

describe('validación de telefono', () => {
  it.each(['3001112222', '7654321'])('acepta %s', async (telefono) => {
    const paciente = plainToInstance(CreatePacienteDto, { ...pacienteBase, telefono });
    const doctor = plainToInstance(CreateDoctorDto, { ...doctorBase, telefono });
    expect(await erroresDeTelefono(paciente)).toHaveLength(0);
    expect(await erroresDeTelefono(doctor)).toHaveLength(0);
  });

  it.each(['abc', '300-111-2222', '+573001112222', '300 111', '123456', '1234567890123456'])(
    'rechaza %s',
    async (telefono) => {
      const paciente = plainToInstance(CreatePacienteDto, { ...pacienteBase, telefono });
      const doctor = plainToInstance(CreateDoctorDto, { ...doctorBase, telefono });
      expect(await erroresDeTelefono(paciente)).not.toHaveLength(0);
      expect(await erroresDeTelefono(doctor)).not.toHaveLength(0);
    },
  );
});
