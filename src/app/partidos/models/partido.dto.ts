export class PartidoDTO {

  id!: number;
  idequipo!: number;
  amistoso!: boolean;
  fecha!: Date;
  campo!: string;
  descripcion: string;
  nombre!: string;
  municipio!: string;
  coordenadas!: string;
  rival!: string;
  local:boolean = false;
  goleslocal!:number;
  golesvisitante!:number;


  constructor(){

  }

}
