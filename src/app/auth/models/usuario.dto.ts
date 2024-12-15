export class UsuarioDTO {

  id!: number;
  telefono!: string;
  email!: string;
  username!: string;
  password!: string;
  token?: string;
  nombre!: string;
  apellido1!: string;
  apellido2!: string;
  fechanacimiento!: Date;
  isAdmin:boolean = false;

  constructor(){

  }

}
