import { AlumnoDesarrolloEstado } from 'app/entities/enumerations/alumno-desarrollo-estado.model';

export interface IAlumnoDesarrollo {
  id?: number;
  clasesTeoriaProgramadas?: number | null;
  clasesPracticasProgramas?: number | null;
  clasesInasistenciaTeoria?: number | null;
  clasesInasistenciaPractica?: number | null;
  clasesRealizadasTeoria?: number | null;
  clasesRealizadasPractica?: number | null;
  alumnoDesarrolloEstado?: AlumnoDesarrolloEstado | null;
}

export class AlumnoDesarrollo implements IAlumnoDesarrollo {
  constructor(
    public id?: number,
    public clasesTeoriaProgramadas?: number | null,
    public clasesPracticasProgramas?: number | null,
    public clasesInasistenciaTeoria?: number | null,
    public clasesInasistenciaPractica?: number | null,
    public clasesRealizadasTeoria?: number | null,
    public clasesRealizadasPractica?: number | null,
    public alumnoDesarrolloEstado?: AlumnoDesarrolloEstado | null
  ) {}
}

export function getAlumnoDesarrolloIdentifier(alumnoDesarrollo: IAlumnoDesarrollo): number | undefined {
  return alumnoDesarrollo.id;
}
