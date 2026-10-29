import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { NivelAlerta } from './entities/alerta.entity.js';

export class CreateAlertaDto {
  @IsString()
  @IsNotEmpty()
  resultado: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @IsEnum(NivelAlerta)
  @IsNotEmpty()
  nivel: NivelAlerta;
}

export class UpdateAlertaDto {
  @IsString()
  @IsNotEmpty()
  resultado: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @IsEnum(NivelAlerta)
  @IsNotEmpty()
  nivel: NivelAlerta;

  @IsString()
  @IsNotEmpty()
  @Length(3, 8)
  codigoAlerta?: string;
}
