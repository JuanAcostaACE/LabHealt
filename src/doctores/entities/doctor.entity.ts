import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { HistoriaClinica } from '../../historias-clinicas/entities/historia-clinica.entity.js';

@Entity({ name: 'doctores' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  especialidad: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  licencia: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  telefono: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'codigo_doctor' })
  codigoDoctor?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => HistoriaClinica, (historia) => historia.doctor)
  histories: HistoriaClinica[];
}
