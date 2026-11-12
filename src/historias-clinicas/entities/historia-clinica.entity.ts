import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity.js';
import { Doctor } from '../../doctores/entities/doctor.entity.js';
import { Alerta } from '../../alerta-anormalidad/entities/alerta.entity.js';

@Entity({ name: 'historias_clinicas' })
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'paciente_id' })
  pacienteId: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.histories, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'paciente_id' })
  paciente: Relation<Paciente>;

  @Column({ type: 'int', name: 'doctor_id' })
  doctorId: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.histories, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Relation<Doctor>;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'text' })
  diagnostico: string;

  @Column({ type: 'text' })
  tratamiento: string;

  @Column({ type: 'text' })
  observaciones: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'codigo_historia' })
  codigoHistoria?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Alerta, (alerta) => alerta.historia)
  alerts: Alerta[];
}
