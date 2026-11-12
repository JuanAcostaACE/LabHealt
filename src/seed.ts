import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PacientesService } from './pacientes/pacientes.service.js';
import { DoctoresService } from './doctores/doctores.service.js';
import { HistoriasClinicasService } from './historias-clinicas/historias-clinicas.service.js';
import { AlertaAnormalidadService } from './alerta-anormalidad/alerta-anormalidad.service.js';
import { NivelAlerta } from './alerta-anormalidad/entities/alerta.entity.js';

const PACIENTES = [
  { nombre: 'Ana Pérez', documento: '1098765432', telefono: '3001112222', email: 'ana.perez@test.com', fechaNacimiento: '1995-04-12', tipoSangre: 'O+', antecedentesClinicos: 'Ninguno' },
  { nombre: 'Carlos Gómez', documento: '1023456789', telefono: '3014445555', email: 'carlos.gomez@test.com', fechaNacimiento: '1982-09-30', tipoSangre: 'A-', antecedentesClinicos: 'Hipertensión desde 2018' },
  { nombre: 'Lucía Ñustes', documento: '1077889900', telefono: '3026667777', email: 'lucia.nustes@test.com', fechaNacimiento: '2001-01-25', tipoSangre: 'AB+', antecedentesClinicos: 'Asma leve' },
];

const DOCTORES = [
  { nombre: 'Gregory House', especialidad: 'Medicina interna', licencia: 'LIC-001', email: 'house@test.com', telefono: '3002223333' },
  { nombre: 'Meredith Grey', especialidad: 'Cirugía general', licencia: 'LIC-002', email: 'grey@test.com', telefono: '3003334444' },
];

// Cada historia apunta a una posición de los arreglos de arriba, no a un id fijo.
const HISTORIAS = [
  { paciente: 0, doctor: 0, fecha: '2026-10-05', diagnostico: 'Anemia ferropénica', tratamiento: 'Hierro oral 300 mg', observaciones: 'Control en un mes' },
  { paciente: 1, doctor: 1, fecha: '2026-10-18', diagnostico: 'Hipertensión arterial', tratamiento: 'Losartán 50 mg', observaciones: 'Dieta baja en sodio' },
  { paciente: 2, doctor: 0, fecha: '2026-11-02', diagnostico: 'Crisis asmática leve', tratamiento: 'Salbutamol inhalado', observaciones: 'Evitar el ejercicio intenso' },
];

const ALERTAS = [
  { historia: 0, resultado: 'Hemoglobina 7.1 g/dL', mensaje: 'Por debajo del rango de referencia', nivel: NivelAlerta.Alto },
  { historia: 1, resultado: 'Presión 150/95 mmHg', mensaje: 'Por encima del rango de referencia', nivel: NivelAlerta.Medio },
  { historia: 2, resultado: 'Saturación 94%', mensaje: 'Ligeramente baja, repetir la medición', nivel: NivelAlerta.Bajo },
];

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error'] });
  const pacientesService = app.get(PacientesService);
  const doctoresService = app.get(DoctoresService);
  const historiasService = app.get(HistoriasClinicasService);
  const alertasService = app.get(AlertaAnormalidadService);

  const existentes = await pacientesService.findAll();
  if (existentes.length > 0) {
    console.log(`La base ya tiene ${existentes.length} paciente(s); no se inserta nada.`);
    console.log('Para empezar de cero: TRUNCATE TABLE alertas, historias_clinicas, pacientes, doctores RESTART IDENTITY CASCADE;');
    await app.close();
    return;
  }

  const pacientes = [];
  for (const paciente of PACIENTES) pacientes.push((await pacientesService.create(paciente)).data);

  const doctores = [];
  for (const doctor of DOCTORES) doctores.push((await doctoresService.create(doctor)).data);

  const historias = [];
  for (const h of HISTORIAS) {
    const creada = await historiasService.create({
      pacienteId: pacientes[h.paciente].id,
      doctorId: doctores[h.doctor].id,
      fecha: h.fecha,
      diagnostico: h.diagnostico,
      tratamiento: h.tratamiento,
      observaciones: h.observaciones,
    });
    historias.push(creada.data);
  }

  for (const a of ALERTAS) {
    await alertasService.create({
      resultado: a.resultado,
      mensaje: a.mensaje,
      nivel: a.nivel,
      historiaId: historias[a.historia].id,
    });
  }

  console.log(
    `Listo: ${pacientes.length} pacientes, ${doctores.length} doctores, ${historias.length} historias clínicas y ${ALERTAS.length} alertas.`,
  );
  await app.close();
}

// El contexto de Nest deja handles abiertos (Observe), así que se cierra a mano.
seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
