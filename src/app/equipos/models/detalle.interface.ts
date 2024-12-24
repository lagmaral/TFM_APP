export interface DetalleEquipo {
  nombreEquipo: string;
  categoriaEquipo:string;
  posicion:string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  dorsal: string;
  imagen: {
    src: string;
    srcset?: string;
  };
  descripcion: string;
}
