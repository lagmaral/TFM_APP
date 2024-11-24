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

  constructor(){

  }
  /*constructor(
    id: number,
    telefono: string,
    email: string,
    username: string,
    password: string,
    token: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    fechanacimiento: Date
  ) {
    this.id = id;
    this.telefono = telefono;
    this.email = email;
    this.username = username;
    this.password= password;
    this.token =token;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.fechanacimiento = fechanacimiento;
  }*/
}
