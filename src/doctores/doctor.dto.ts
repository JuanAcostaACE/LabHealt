import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
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

  @IsString()
  @IsNotEmpty()
  telefono: string;
}

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @IsString()
  @IsOptional()
  @Length(3, 8)
  codigoDoctor?: string;
}