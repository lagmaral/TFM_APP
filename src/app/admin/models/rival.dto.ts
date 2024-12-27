export class RivalDTO {
  id:number;
  nombre: string;
  image: string;

  constructor(
    id: number,
    nombre: string,
    image: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.image = image;
  }
}
