import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

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

  @IsDateString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()
  tipoSangre: string;

  @IsString()
  @IsNotEmpty()
  antecedentesClinicos: string;
}

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {
  @IsString()
  @IsOptional()
  @Length(3, 8)
  codigoPaciente?: string;
}
