import { EquipoStaffDTO } from "./equipo-staff.dto";

export class StaffDTO {
  id!: number;
  telefono: string;
  internalkey: string;
  foto: string;
  admin: boolean;
  fechanacimiento: Date;
  nombre: string;
  apellido1: string;
  apellido2: string;
  equiposList : EquipoStaffDTO[];
  constructor(
    id: number,
    telefono: string,
    internalkey: string,
    foto: string,
    admin: boolean,
    fechanacimiento: Date,
    nombre: string,
    apellido1: string,
    apellido2: string,
    equiposList : EquipoStaffDTO[]
  ) {
    this.id = id;
    this.telefono = telefono;
    this.internalkey = internalkey;
    this.foto = foto;
    this.admin = admin;
    this.fechanacimiento = fechanacimiento;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.equiposList = equiposList;
  }
}
