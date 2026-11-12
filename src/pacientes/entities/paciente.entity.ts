import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { HistoriaClinica } from '../../historias-clinicas/entities/historia-clinica.entity.js';

@Entity({ name: 'pacientes' })
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  documento: string;

  @Column({ type: 'varchar', length: 50 })
  telefono: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'date', name: 'fecha_nacimiento' })
  fechaNacimiento: string;

  @Column({ type: 'varchar', length: 5, name: 'tipo_sangre' })
  tipoSangre: string;

  @Column({ type: 'text', name: 'antecedentes_clinicos' })
  antecedentesClinicos: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'codigo_paciente' })
  codigoPaciente?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => HistoriaClinica, (historia) => historia.paciente)
  histories: HistoriaClinica[];
}
