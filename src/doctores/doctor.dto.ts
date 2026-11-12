import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";
import {PartialType} from "@nestjs/mapped-types";
export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  especialidad: string;

  @IsString()
  @IsNotEmpty()
  licencia: string;

  @IsEmail()
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