import { IInscripcionDetalle } from 'app/entities/inscripcion-detalle/inscripcion-detalle.model';
import { IAsignaturaRequisito } from 'app/entities/asignatura-requisito/asignatura-requisito.model';

export interface IInscripcionAsignaturaRequisito {
  id?: number;
  descripcion?: string | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  documento?: string | null;
  inscripcionDetalle?: IInscripcionDetalle;
  asignaturaRequisito?: IAsignaturaRequisito;
}

export class InscripcionAsignaturaRequisito implements IInscripcionAsignaturaRequisito {
  constructor(
    public id?: number,
    public descripcion?: string | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public documento?: string | null,
    public inscripcionDetalle?: IInscripcionDetalle,
    public asignaturaRequisito?: IAsignaturaRequisito
  ) {}
}

export function getInscripcionAsignaturaRequisitoIdentifier(
  inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito
): number | undefined {
  return inscripcionAsignaturaRequisito.id;
}
