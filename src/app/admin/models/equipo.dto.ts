import { PlantillaDTO } from "./plantilla.dto";

export class EquipoDTO {
  id:number;
  idtemporada: number;
  nombre: string;
  descripcion: string;
  orden: number;
  activo: boolean;
  internalkey:string;


  constructor(
    id: number,
    idtemporada: number,
    nombre: string,
    descripcion: string,
    orden: number,
    activo: boolean,
    internalkey:string,
  ) {
    this.id = id;
    this.idtemporada = idtemporada;
    this.nombre = nombre;
    this.internalkey = internalkey;
    this.descripcion = descripcion;
    this.orden = orden;
    this.activo = activo;


  }
}
