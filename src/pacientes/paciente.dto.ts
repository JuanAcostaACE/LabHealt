import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()
  tipoSangre: string;

  @IsString()
  @IsNotEmpty()
  antecedentesClinicos: string;
}

export class UpdatePacienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()
  tipoSangre: string;

  @IsString()
  @IsNotEmpty()
  antecedentesClinicos: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 8)
  codigoPaciente?: string;
}