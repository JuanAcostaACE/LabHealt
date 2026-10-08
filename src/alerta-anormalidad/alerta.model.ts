export enum NivelAlerta {
    Bajo = 'Bajo',
    Medio = 'Medio',
    Alto = 'Alto',
}

export interface Alerta {
    id: string;
    resultado: string;
    mensaje: string;
    nivel: NivelAlerta;
    codigoAlerta?: string;
}
