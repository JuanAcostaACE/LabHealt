import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsNumberString({ no_symbols: true }, { message: 'telefono debe contener solo números' })
  @Length(7, 15, { message: 'telefono debe tener entre 7 y 15 dígitos' })
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
