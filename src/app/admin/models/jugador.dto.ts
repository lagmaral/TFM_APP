export class JugadorDTO {

  id:number;
  idequipo: number;
  idposicion: number;
  fechanacimiento: Date;
  internalkey: string;
  //idcuota: number;
  consentimiento: boolean;
  nombre: string;
  apellido1: string;
  apellido2: string;

  constructor(
    id:number,
    idequipo: number,
    idposicion: number,
    fechanacimiento: Date,
    internalkey: string,
    //idcuota: number,
    consentimiento: boolean,
    nombre: string,
    apellido1: string,
    apellido2: string,
  ) {
    this.id = id;
    this.idequipo = idequipo;
    this.nombre = nombre;
    this.internalkey = internalkey;
    this.idposicion = idposicion;
    this.fechanacimiento = fechanacimiento;
    //this.idcuota = idcuota;
    this.consentimiento = consentimiento;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;

  }
}