import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateDoctorDto {
  @IsString() @IsNotEmpty() nombre: string;
  @IsString() @IsNotEmpty() especialidad: string;
  @IsString() @IsNotEmpty() licencia: string;
  @IsEmail()  @IsNotEmpty() email: string;
  @IsString() @IsNotEmpty() telefono: string;
}

export class UpdateDoctorDto {
  @IsString() @IsNotEmpty() nombre: string;
  @IsString() @IsNotEmpty() especialidad: string;
  @IsString() @IsNotEmpty() licencia: string;
  @IsEmail()  @IsNotEmpty() email: string;
  @IsString() @IsNotEmpty() telefono: string;
  @IsString() @IsNotEmpty() @Length(3, 8) codigoDoctor?: string;
}