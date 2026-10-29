import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity.js';
import { Doctor } from '../../doctores/entities/doctor.entity.js';

@Entity({ name: 'historias_clinicas' })
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'paciente_id' })
  pacienteId: number;

  @ManyToOne(() => Paciente, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @Column({ type: 'int', name: 'doctor_id' })
  doctorId: number;

  @ManyToOne(() => Doctor, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

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
}
