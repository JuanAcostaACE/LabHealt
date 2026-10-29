# LabHealt

## Diagnóstico y datos clínicos

**API de resultados de laboratorio:** recepción e interpretación de exámenes (valores de referencia, alertas de anormalidad).

## Entidades

- Paciente
- OrdenLaboratorio
- Examen
- ResultadoExamen
- AlertaAnormalidad

## Integrantes

- Juan David Acosta Urbano
- Juan Esteban Cuaran Santanader
- Joseph Herrera

## Instalación

```bash
npm install
```

## Ejecución

```bash
# desarrollo
npm run start

# modo watch
npm run start:dev

# producción
npm run start:prod
```

## Pruebas

```bash
# unitarias
npm run test

# e2e
npm run test:e2e

# cobertura
npm run test:cov
```
## Diagrama

<img width="1072" height="1113" alt="image" src="https://github.com/user-attachments/assets/7e36ec9e-12c8-4c60-a789-efa215f00ae8" />

## Docker

```bash
cp .env-example .env   # opcional, hay valores por defecto
docker compose up --build
```

- API: http://localhost:3000
- pgAdmin: http://localhost:5050
- PostgreSQL: localhost:5432
