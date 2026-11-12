import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { NivelAlerta } from './entities/alerta.entity.js';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAlertaDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  resultado: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  mensaje: string;

  @IsEnum(NivelAlerta)
  @IsNotEmpty()
  nivel: NivelAlerta;

  @IsInt()
  @IsNotEmpty()
  historiaId: number;
}

export class UpdateAlertaDto extends PartialType(CreateAlertaDto) {
  @IsString()
  @IsOptional()
  @Length(3, 8)
  codigoAlerta?: string;
}
