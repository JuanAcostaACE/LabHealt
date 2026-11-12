import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length, MaxLength, MinLength } from "class-validator";
import { NivelAlerta } from './entities/alerta.entity.js';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAlertaDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  resultado: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsNotEmpty()
  mensaje: string;

  @IsEnum(NivelAlerta)
  @IsNotEmpty()
  nivel: NivelAlerta;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  historiaId: number;
}

export class UpdateAlertaDto extends PartialType(CreateAlertaDto) {
  @IsString()
  @IsOptional()
  @Length(3, 8)
  codigoAlerta?: string;
}
