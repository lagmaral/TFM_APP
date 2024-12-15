import { EquipoDTO } from './equipo.dto';
import { JugadorDTO } from './jugador.dto';

export class PlantillaDTO {
  id: number;
  idequipo: number;
  equipo: EquipoDTO;
  idjugador: number;
  jugador: JugadorDTO;
  dorsal: string;
}
