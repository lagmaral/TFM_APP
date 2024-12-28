import { EquipoDTO } from "src/app/admin/models/equipo.dto";
import { RivalDTO } from "src/app/admin/models/rival.dto";

export class PartidoDTO {

  id!: number;
  idequipo!: number;
  equipo!:EquipoDTO;
  equipoicon!:string;
  amistoso!: boolean;
  fecha!: Date;
  campo!: string;
  descripcion!: string;
  nombre!: string;
  //municipio!: string;
  coordenadas!: string;
  idrival!: number;
  rival!: RivalDTO;
  local:boolean = false;
  goleslocal!:number;
  golesvisitante!:number;


  constructor(){

  }

}
