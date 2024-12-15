export class CargoDTO {
  id:number;
  nombre: string;
  orden: number;

  constructor(
    id: number,
    nombre: string,
    orden: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.orden = orden;
  }
}
