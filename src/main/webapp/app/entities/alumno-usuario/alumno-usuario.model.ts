import { IAlumno } from 'app/entities/alumno/alumno.model';
import { Estado } from 'app/entities/enumerations/estado.model';

export interface IAlumnoUsuario {
  id?: number;
  activo?: Estado | null;
  usuario?: string;
  clave?: string;
  imagenContentType?: string | null;
  imagen?: string | null;
  alumno?: IAlumno;
}

export class AlumnoUsuario implements IAlumnoUsuario {
  constructor(
    public id?: number,
    public activo?: Estado | null,
    public usuario?: string,
    public clave?: string,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public alumno?: IAlumno
  ) {}
}

export function getAlumnoUsuarioIdentifier(alumnoUsuario: IAlumnoUsuario): number | undefined {
  return alumnoUsuario.id;
}
