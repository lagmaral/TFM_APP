import { PlantillaDTO } from "./plantilla.dto";

export class JugadorDTO {

  id:number;
  idequipo: number;
  idposicion: number;
  posicionDescription:string
  fechanacimiento: Date;
  internalkey: string;
  //idcuota: number;
  consentimiento: boolean;
  nombre: string;
  apellido1: string;
  apellido2: string;
  descripcion: string;
  plantillaList : PlantillaDTO[];
  constructor(
    id:number,
    idequipo: number,
    idposicion: number,
    posicionDescription:string,
    fechanacimiento: Date,
    internalkey: string,
    //idcuota: number,
    consentimiento: boolean,
    nombre: string,
    apellido1: string,
    apellido2: string,
    descripcion: string,
    plantillaList : PlantillaDTO[]
  ) {
    this.id = id;
    this.idequipo = idequipo;
    this.nombre = nombre;
    this.internalkey = internalkey;
    this.idposicion = idposicion;
    this.posicionDescription = posicionDescription;
    this.fechanacimiento = fechanacimiento;
    //this.idcuota = idcuota;
    this.consentimiento = consentimiento;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.descripcion = descripcion;
    this.plantillaList = plantillaList;

  }
}
