import { PartialType } from "@nestjs/mapped-types";
import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";
import { NoFutura } from "../common/no-futura.validator.js";

export const TIPOS_DE_SANGRE = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export class CreatePacienteDto {
  @IsString()
  @Matches(/^[\p{L}\p{M} '.-]+$/u, { message: 'nombre solo puede tener letras, espacios, apóstrofos, puntos y guiones' })
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  nombre: string;

  @IsNumberString({ no_symbols: true }, { message: 'documento debe contener solo números' })
  @Length(5, 20, { message: 'documento debe tener entre 5 y 20 dígitos' })
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
  @NoFutura({ message: 'fechaNacimiento no puede ser una fecha futura' })
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsIn(TIPOS_DE_SANGRE, { message: `tipoSangre debe ser uno de: ${TIPOS_DE_SANGRE.join(', ')}` })
  @IsNotEmpty()
  tipoSangre: string;

  @IsString()
  @MinLength(3)
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
