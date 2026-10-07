export interface Paciente {
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