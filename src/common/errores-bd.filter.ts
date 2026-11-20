import { ArgumentsHost, Catch, ConflictException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

type ErrorPg = { code?: string; detail?: string };

// Un unique violado (documento, licencia...) salía como 500 "Internal server error" y el front solo puede mostrar lo que llega.
@Catch(QueryFailedError)
export class ErroresBdFilter extends BaseExceptionFilter {
  catch(error: QueryFailedError, host: ArgumentsHost) {
    const pg = (error as QueryFailedError & { driverError?: ErrorPg }).driverError;
    if (pg?.code !== '23505') {
      return super.catch(error, host);
    }
    const campo = /Key \((.+?)\)=/.exec(pg.detail ?? '')?.[1] ?? 'dato';
    super.catch(new ConflictException(`Ya existe un registro con ese ${campo}`), host);
  }
}
