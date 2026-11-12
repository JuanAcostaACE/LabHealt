import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { HistoriaClinica } from '../../historias-clinicas/entities/historia-clinica.entity.js';

export enum NivelAlerta {
  Bajo = 'Bajo',
  Medio = 'Medio',
  Alto = 'Alto',
}

@Entity({ name: 'alertas' })
export class Alerta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  resultado: string;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({ type: 'enum', enum: NivelAlerta })
  nivel: NivelAlerta;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'codigo_alerta' })
  codigoAlerta?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'int', name: 'historia_id' })
  historiaId: number;

  @ManyToOne(() => HistoriaClinica, (historia) => historia.alerts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'historia_id' })
  historia: Relation<HistoriaClinica>;
}
