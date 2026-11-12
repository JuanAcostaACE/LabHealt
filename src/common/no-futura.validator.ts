import { registerDecorator, type ValidationOptions } from 'class-validator';

/** Rechaza una fecha `YYYY-MM-DD` posterior a hoy. */
export function NoFutura(options?: ValidationOptions) {
  return (target: object, propertyName: string) => {
    registerDecorator({
      name: 'noFutura',
      target: target.constructor,
      propertyName,
      options,
      validator: {
        validate(valor: unknown) {
          if (typeof valor !== 'string') return false;
          const dia = valor.slice(0, 10);
          if (Number.isNaN(new Date(dia).getTime())) return false;
          // Se comparan como texto: new Date('2026-11-13') es UTC y en una zona
          // negativa queda "antes" de hoy, así que comparar objetos Date falla.
          const hoy = new Date();
          const hoyLocal = [
            hoy.getFullYear(),
            String(hoy.getMonth() + 1).padStart(2, '0'),
            String(hoy.getDate()).padStart(2, '0'),
          ].join('-');
          return dia <= hoyLocal;
        },
        defaultMessage: () => `${propertyName} no puede ser una fecha futura`,
      },
    });
  };
}
