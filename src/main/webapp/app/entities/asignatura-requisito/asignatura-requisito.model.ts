import { IInscripcionAsignaturaRequisito } from 'app/entities/inscripcion-asignatura-requisito/inscripcion-asignatura-requisito.model';
import { IAsignatura } from 'app/entities/asignatura/asignatura.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoRequisito } from 'app/entities/enumerations/tipo-requisito.model';

export interface IAsignaturaRequisito {
  id?: number;
  activo?: Estado;
  tipo?: TipoRequisito;
  nombre?: string;
  descripcion?: string | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  inscripcionAsignaturaRequisitos?: IInscripcionAsignaturaRequisito[] | null;
  asignaturas?: IAsignatura[] | null;
}

export class AsignaturaRequisito implements IAsignaturaRequisito {
  constructor(
    public id?: number,
    public activo?: Estado,
    public tipo?: TipoRequisito,
    public nombre?: string,
    public descripcion?: string | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public inscripcionAsignaturaRequisitos?: IInscripcionAsignaturaRequisito[] | null,
    public asignaturas?: IAsignatura[] | null
  ) {}
}

export function getAsignaturaRequisitoIdentifier(asignaturaRequisito: IAsignaturaRequisito): number | undefined {
  return asignaturaRequisito.id;
}
