import { CargoDTO } from "./cargo.dto";
import { EquipoDTO } from "./equipo.dto";
import { StaffDTO } from "./staff.dto";

export class EquipoStaffDTO {
  id: number;
  idcargo: number;
  cargo: CargoDTO;
  idequipo: number;
  equipo: EquipoDTO;
  idstaff: number;
  staff: StaffDTO;

}

