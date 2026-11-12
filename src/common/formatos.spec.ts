import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';
import { CreatePacienteDto } from '../pacientes/paciente.dto.js';
import { CreateDoctorDto } from '../doctores/doctor.dto.js';
import { CreateHistoriaClinicaDto } from '../historias-clinicas/historia-clinica.dto.js';
import { CreateAlertaDto } from '../alerta-anormalidad/alerta.dto.js';
import { NivelAlerta } from '../alerta-anormalidad/entities/alerta.entity.js';

const paciente = {
  nombre: 'Ana Pérez',
  documento: '1098765432',
  telefono: '3001112222',
  email: 'ana@test.com',
  fechaNacimiento: '1995-04-12',
  tipoSangre: 'O+',
  antecedentesClinicos: 'ninguno',
};

const doctor = {
  nombre: 'Gregory House',
  especialidad: 'Medicina interna',
  licencia: 'LIC-123',
  email: 'house@test.com',
  telefono: '3001112222',
};

const historia = {
  pacienteId: 1,
  doctorId: 1,
  fecha: '2026-01-15',
  diagnostico: 'Anemia',
  tratamiento: 'Hierro',
  observaciones: 'control en un mes',
};

const alerta = {
  resultado: 'Hemoglobina 7',
  mensaje: 'Valor bajo',
  nivel: NivelAlerta.Alto,
  historiaId: 1,
};

type Dto = new () => object;

const errores = async (Clase: Dto, base: object, campo: string, valor: unknown) => {
  const dto = plainToInstance(Clase, { ...base, [campo]: valor });
  return (await validate(dto)).filter((e) => e.property === campo);
};

const manana = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

const validos: [string, Dto, object, string, unknown][] = [
  ['documento numérico', CreatePacienteDto, paciente, 'documento', '1098765432'],
  ['nombre con tilde y ñ', CreatePacienteDto, paciente, 'nombre', 'Ñoño Pérez-Gómez'],
  ['tipoSangre de la lista', CreatePacienteDto, paciente, 'tipoSangre', 'AB-'],
  ['licencia alfanumérica', CreateDoctorDto, doctor, 'licencia', 'LIC-2024-07'],
  ['fecha pasada', CreateHistoriaClinicaDto, historia, 'fecha', '2020-01-01'],
  ['fecha de hoy', CreateHistoriaClinicaDto, historia, 'fecha', new Date().toISOString().slice(0, 10)],
];

const invalidos: [string, Dto, object, string, unknown][] = [
  ['documento con letras', CreatePacienteDto, paciente, 'documento', 'DOC-AL'],
  ['documento muy corto', CreatePacienteDto, paciente, 'documento', '1234'],
  ['documento muy largo', CreatePacienteDto, paciente, 'documento', '1'.repeat(21)],
  ['nombre con números', CreatePacienteDto, paciente, 'nombre', 'Ana 123'],
  ['nombre de dos letras', CreatePacienteDto, paciente, 'nombre', 'An'],
  ['tipoSangre inventado', CreatePacienteDto, paciente, 'tipoSangre', 'Z+'],
  ['fechaNacimiento futura', CreatePacienteDto, paciente, 'fechaNacimiento', manana()],
  ['especialidad con números', CreateDoctorDto, doctor, 'especialidad', 'Cardiologia 2'],
  ['licencia con espacios', CreateDoctorDto, doctor, 'licencia', 'LIC 123'],
  ['fecha futura', CreateHistoriaClinicaDto, historia, 'fecha', manana()],
  ['pacienteId cero', CreateHistoriaClinicaDto, historia, 'pacienteId', 0],
  ['doctorId negativo', CreateHistoriaClinicaDto, historia, 'doctorId', -3],
  ['diagnostico de dos letras', CreateHistoriaClinicaDto, historia, 'diagnostico', 'ab'],
  ['historiaId cero', CreateAlertaDto, alerta, 'historiaId', 0],
  ['mensaje de dos letras', CreateAlertaDto, alerta, 'mensaje', 'ab'],
];

describe('formato de los campos', () => {
  it.each(validos)('acepta %s', async (_, Clase, base, campo, valor) => {
    expect(await errores(Clase, base, campo, valor)).toHaveLength(0);
  });

  it.each(invalidos)('rechaza %s', async (_, Clase, base, campo, valor) => {
    expect(await errores(Clase, base, campo, valor)).not.toHaveLength(0);
  });
});
