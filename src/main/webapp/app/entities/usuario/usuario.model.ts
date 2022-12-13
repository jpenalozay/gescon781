import { IUser } from 'app/entities/user/user.model';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { IProgramacionDeshabilitacion } from 'app/entities/programacion-deshabilitacion/programacion-deshabilitacion.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { IComputadora } from 'app/entities/computadora/computadora.model';

export interface IUsuario {
  id?: number;
  codigo?: string;
  codigoSecreto?: string | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  user?: IUser;
  empleado?: IEmpleado | null;
  programacionDeshabilitacions?: IProgramacionDeshabilitacion[] | null;
  sucursals?: ISucursal[];
  computadoras?: IComputadora[] | null;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public codigo?: string,
    public codigoSecreto?: string | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public user?: IUser,
    public empleado?: IEmpleado | null,
    public programacionDeshabilitacions?: IProgramacionDeshabilitacion[] | null,
    public sucursals?: ISucursal[],
    public computadoras?: IComputadora[] | null
  ) {}
}

export function getUsuarioIdentifier(usuario: IUsuario): number | undefined {
  return usuario.id;
}
