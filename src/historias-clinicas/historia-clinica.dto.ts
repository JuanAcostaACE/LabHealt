import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateHistoriaClinicaDto {
  @IsString()
  @IsNotEmpty()
  pacienteId: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @IsNotEmpty()
  tratamiento: string;

  @IsString()
  @IsNotEmpty()
  observaciones: string;
}

export class UpdateHistoriaClinicaDto {
  @IsString()
  @IsNotEmpty()
  pacienteId: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @IsNotEmpty()
  tratamiento: string;

  @IsString()
  @IsNotEmpty()
  observaciones: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 8)
  codigoHistoria?: string;
}
