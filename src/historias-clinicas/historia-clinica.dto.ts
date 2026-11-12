import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
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
  @MaxLength(500)
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  tratamiento: string;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  observaciones: string;
}

export class UpdateHistoriaClinicaDto extends PartialType(CreateHistoriaClinicaDto) {
  @IsString()
  @MaxLength(20)
  @IsOptional()
  codigoHistoria?: string;
}
