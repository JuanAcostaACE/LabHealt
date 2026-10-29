import { IsDateString, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateHistoriaClinicaDto {
  @IsInt()
  @IsNotEmpty()
  pacienteId: number;

  @IsInt()
  @IsNotEmpty()
  doctorId: number;

  @IsDateString()
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
  @IsInt()
  @IsNotEmpty()
  pacienteId: number;

  @IsInt()
  @IsNotEmpty()
  doctorId: number;

  @IsDateString()
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
