import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';
import { CreatePacienteDto } from './paciente.dto.js';
import { CreateDoctorDto } from '../doctores/doctor.dto.js';

const paciente = {
  nombre: 'Ana',
  documento: '1234567',
  telefono: '3001112222',
  email: 'ana@test.com',
  fechaNacimiento: '1995-04-12',
  tipoSangre: 'O+',
  antecedentesClinicos: 'ninguno',
};

const doctor = {
  nombre: 'Dr House',
  especialidad: 'General',
  licencia: 'LIC-1',
  email: 'house@test.com',
  telefono: '3001112222',
};

type Dto = new () => object;

const errores = async (Clase: Dto, base: object, campo: string, valor: string) => {
  const dto = plainToInstance(Clase, { ...base, [campo]: valor });
  return (await validate(dto)).filter((e) => e.property === campo);
};

const casos: [string, Dto, object, string, number][] = [
  ['paciente.nombre', CreatePacienteDto, paciente, 'nombre', 255],
  ['paciente.antecedentesClinicos', CreatePacienteDto, paciente, 'antecedentesClinicos', 1000],
  ['doctor.nombre', CreateDoctorDto, doctor, 'nombre', 255],
  ['doctor.especialidad', CreateDoctorDto, doctor, 'especialidad', 255],
  ['doctor.licencia', CreateDoctorDto, doctor, 'licencia', 50],
];

describe('longitud máxima de los campos', () => {
  it.each(casos)('%s acepta el máximo', async (_, Clase, base, campo, max) => {
    expect(await errores(Clase, base, campo, 'a'.repeat(max))).toHaveLength(0);
  });

  it.each(casos)('%s rechaza un carácter más', async (_, Clase, base, campo, max) => {
    expect(await errores(Clase, base, campo, 'a'.repeat(max + 1))).not.toHaveLength(0);
  });

  // El local part de un email no puede pasar de 64, así que el tope de 255 se
  // comprueba con un dominio largo y revisando que el error sea el de longitud.
  const emailLargo = `${'a'.repeat(60)}@${Array(5).fill('a'.repeat(60)).join('.')}.com`;

  it.each([
    ['paciente', CreatePacienteDto, paciente] as const,
    ['doctor', CreateDoctorDto, doctor] as const,
  ])('%s.email rechaza más de 255', async (_, Clase, base) => {
    expect(emailLargo.length).toBeGreaterThan(255);
    const encontrados = await errores(Clase, base, 'email', emailLargo);
    expect(encontrados.some((e) => 'maxLength' in (e.constraints ?? {}))).toBe(true);
  });
});
