import { ArgumentsHost, Catch, ConflictException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

type ErrorPg = { code?: string; detail?: string };

// Un unique violado (23505) o un borrado con hijos por RESTRICT (23503) salían como 500
// "Internal server error" y el front solo puede mostrar lo que llega.
@Catch(QueryFailedError)
export class ErroresBdFilter extends BaseExceptionFilter {
  catch(error: QueryFailedError, host: ArgumentsHost) {
    const pg = (error as QueryFailedError & { driverError?: ErrorPg }).driverError;
    const detail = pg?.detail ?? '';

    if (pg?.code === '23505') {
      const campo = /Key \((.+?)\)=/.exec(detail)?.[1] ?? 'dato';
      return super.catch(new ConflictException(`Ya existe un registro con ese ${campo}`), host);
    }
    if (pg?.code === '23503') {
      const tabla = /still referenced from table "(.+?)"/.exec(detail)?.[1] ?? 'otros registros';
      return super.catch(new ConflictException(`No se puede eliminar: tiene ${tabla} asociadas`), host);
    }
    super.catch(error, host);
  }
}
