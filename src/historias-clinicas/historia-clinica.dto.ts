import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { NoFutura } from "../common/no-futura.validator.js";
import { PartialType } from "@nestjs/mapped-types";

export class CreateHistoriaClinicaDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  pacienteId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  doctorId: number;

  @IsDateString()
  @NoFutura({ message: 'fecha no puede ser una fecha futura' })
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsNotEmpty()
  tratamiento: string;

  @IsString()
  @MinLength(3)
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
