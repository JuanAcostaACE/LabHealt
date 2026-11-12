import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";
import {PartialType} from "@nestjs/mapped-types";
export class CreateDoctorDto {
  @IsString()
  @Matches(/^[\p{L}\p{M} '.-]+$/u, { message: 'nombre solo puede tener letras, espacios, apóstrofos, puntos y guiones' })
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @Matches(/^[\p{L}\p{M} '.-]+$/u, { message: 'especialidad solo puede tener letras, espacios, apóstrofos, puntos y guiones' })
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  especialidad: string;

  @IsString()
  @Matches(/^[A-Za-z0-9-]+$/, { message: 'licencia solo puede tener letras, números y guiones' })
  @Length(3, 50)
  @IsNotEmpty()
  licencia: string;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;

  @IsNumberString({ no_symbols: true }, { message: 'telefono debe contener solo números' })
  @Length(7, 15, { message: 'telefono debe tener entre 7 y 15 dígitos' })
  @IsNotEmpty()
  telefono: string;
}

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @IsString()
  @IsOptional()
  @Length(3, 8)
  codigoDoctor?: string;
}