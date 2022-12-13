import { IAlumno } from 'app/entities/alumno/alumno.model';
import { ILicenciaCategoria } from 'app/entities/licencia-categoria/licencia-categoria.model';

export interface IAlumnoCategoria {
  id?: number;
  licenciaNumeroAlumno?: string;
  alumno?: IAlumno;
  categoria?: ILicenciaCategoria;
}

export class AlumnoCategoria implements IAlumnoCategoria {
  constructor(public id?: number, public licenciaNumeroAlumno?: string, public alumno?: IAlumno, public categoria?: ILicenciaCategoria) {}
}

export function getAlumnoCategoriaIdentifier(alumnoCategoria: IAlumnoCategoria): number | undefined {
  return alumnoCategoria.id;
}
