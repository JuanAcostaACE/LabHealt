import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreatePacienteDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  documento: string;

  @IsNumberString({ no_symbols: true }, { message: 'telefono debe contener solo números' })
  @Length(7, 15, { message: 'telefono debe tener entre 7 y 15 dígitos' })
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  tipoSangre: string;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  antecedentesClinicos: string;
}

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {
  @IsString()
  @IsOptional()
  @Length(3, 8)
  codigoPaciente?: string;
}
