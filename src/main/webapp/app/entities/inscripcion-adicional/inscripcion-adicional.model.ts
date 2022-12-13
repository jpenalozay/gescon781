import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { IRequisitosInscripcion } from 'app/entities/requisitos-inscripcion/requisitos-inscripcion.model';

export interface IInscripcionAdicional {
  id?: number;
  descripcion?: string | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  documento?: string | null;
  cantidad?: string | null;
  costo?: number | null;
  inscripcion?: IInscripcion;
  inscripcionRequisito?: IRequisitosInscripcion | null;
}

export class InscripcionAdicional implements IInscripcionAdicional {
  constructor(
    public id?: number,
    public descripcion?: string | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public documento?: string | null,
    public cantidad?: string | null,
    public costo?: number | null,
    public inscripcion?: IInscripcion,
    public inscripcionRequisito?: IRequisitosInscripcion | null
  ) {}
}

export function getInscripcionAdicionalIdentifier(inscripcionAdicional: IInscripcionAdicional): number | undefined {
  return inscripcionAdicional.id;
}
