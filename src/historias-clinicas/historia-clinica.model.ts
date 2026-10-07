export interface HistoriaClinica {
  id: string;
  pacienteId: string;
  doctorId: string;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  codigoHistoria?: string;
}