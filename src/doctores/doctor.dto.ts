import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";
import {PartialType} from "@nestjs/mapped-types";
export class CreateDoctorDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  especialidad: string;

  @IsString()
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