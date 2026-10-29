import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}
