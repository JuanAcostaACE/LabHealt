import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

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

export class UpdateHistoriaClinicaDto extends PartialType(CreateHistoriaClinicaDto) {
  @IsString()
  @IsOptional()
  codigoHistoria?: string;
}
