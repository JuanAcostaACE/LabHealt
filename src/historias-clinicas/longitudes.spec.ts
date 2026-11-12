import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';
import { CreateHistoriaClinicaDto } from './historia-clinica.dto.js';
import { CreateAlertaDto } from '../alerta-anormalidad/alerta.dto.js';
import { NivelAlerta } from '../alerta-anormalidad/entities/alerta.entity.js';

const historia = {
  pacienteId: 1,
  doctorId: 1,
  fecha: '2026-11-12',
  diagnostico: 'Anemia',
  tratamiento: 'Hierro',
  observaciones: 'control',
};

const alerta = {
  resultado: 'Hemoglobina 7',
  mensaje: 'Valor bajo',
  nivel: NivelAlerta.Alto,
  historiaId: 1,
};

type Dto = new () => object;

const errores = async (Clase: Dto, base: object, campo: string, valor: string) => {
  const dto = plainToInstance(Clase, { ...base, [campo]: valor });
  return (await validate(dto)).filter((e) => e.property === campo);
};

const casos: [string, Dto, object, string, number][] = [
  ['historia.diagnostico', CreateHistoriaClinicaDto, historia, 'diagnostico', 500],
  ['historia.tratamiento', CreateHistoriaClinicaDto, historia, 'tratamiento', 500],
  ['historia.observaciones', CreateHistoriaClinicaDto, historia, 'observaciones', 1000],
  ['alerta.resultado', CreateAlertaDto, alerta, 'resultado', 255],
  ['alerta.mensaje', CreateAlertaDto, alerta, 'mensaje', 500],
];

describe('longitud máxima de los campos', () => {
  it.each(casos)('%s acepta el máximo', async (_, Clase, base, campo, max) => {
    expect(await errores(Clase, base, campo, 'a'.repeat(max))).toHaveLength(0);
  });

  it.each(casos)('%s rechaza un carácter más', async (_, Clase, base, campo, max) => {
    expect(await errores(Clase, base, campo, 'a'.repeat(max + 1))).not.toHaveLength(0);
  });
});
