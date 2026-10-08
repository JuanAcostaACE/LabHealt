import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Doctor } from './doctor.model.js';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto.js';

@Injectable()
export class DoctoresService {
  private doctores: Doctor[] = [
    {
      id: '1',
      nombre: 'Dr. Jordi',
      especialidad: 'Cardiología',
      licencia: 'MED12345',
      email: 'Jordi.cardio@hospital.com',
      telefono: '3009998877',
    },
    {
      id: '2',
      nombre: 'Dra. Elena',
      especialidad: 'Pediatría',
      licencia: 'MED67890',
      email: 'elena.pediatra@hospital.com',
      telefono: '3105554433',
    }
  ];

  findAll() {
    return this.doctores;
  }

  findById(id: string) {
    console.log('.:: Doctor ID: ', id);
    const doctor = this.doctores.find((doc) => doc.id === id);
    console.log('.:: doctor buscado: ', doctor);
    
    if (doctor === undefined) {
      throw new NotFoundException(`Doctor con ID ${id} no existe`);
    }

    if (doctor.id === '-1') {
      throw new ForbiddenException(
        `No tienes permisos para acceder al doctor con ID ${id}`,
      );
    }
    return doctor;
  }

  findByName(nombre: string) {
    const data = this.doctores.find((doc) => doc.nombre === nombre);
    if (!data) {
      throw new NotFoundException(`Doctor con nombre ${nombre} no existe`);
    }
    return { result: data?.email };
  }

  create(doctorPayload: CreateDoctorDto) {
    console.log('.:: doctor: ', doctorPayload);

    const newDoctor = {
      ...doctorPayload,
      id: `${new Date().getTime()}`,
      codigoDoctor: doctorPayload.nombre.substring(0, 3) + '123'
    };
    this.doctores.push(newDoctor);

    return {
      message: 'Doctor creado correctamente',
      data: doctorPayload,
    };
  }

  delete(id: string) {
    const position = this.doctores.findIndex((doc) => doc.id === id);
    if (position === -1) {
      throw new NotFoundException(`Doctor con ID ${id} no existe`);
    }
    this.doctores.splice(position, 1);
    return {
      msg: 'Doctor eliminado correctamente',
    };
  }

  update(id: string, changes: UpdateDoctorDto) {
    const position = this.doctores.findIndex((doc) => doc.id === id);
    if (position === -1) {
      throw new NotFoundException(`Doctor con ID ${id} no existe`);
    }
    const currentData = this.doctores[position];
    const updateDoctor = {
      ...currentData,
      ...changes,
    };
    this.doctores[position] = updateDoctor;

    return {
      msg: 'Doctor actualizado',
      data: updateDoctor,
    };
  }
}