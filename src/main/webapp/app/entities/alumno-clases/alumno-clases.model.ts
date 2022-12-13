import { IAlumno } from 'app/entities/alumno/alumno.model';

export interface IAlumnoClases {
  id?: number;
  clasesTotales?: number | null;
  clasesProgramadas?: number | null;
  clasesRealizadas?: number | null;
  alumno?: IAlumno | null;
}

export class AlumnoClases implements IAlumnoClases {
  constructor(
    public id?: number,
    public clasesTotales?: number | null,
    public clasesProgramadas?: number | null,
    public clasesRealizadas?: number | null,
    public alumno?: IAlumno | null
  ) {}
}

export function getAlumnoClasesIdentifier(alumnoClases: IAlumnoClases): number | undefined {
  return alumnoClases.id;
}
