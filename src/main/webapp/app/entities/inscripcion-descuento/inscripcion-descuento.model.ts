import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';

export interface IInscripcionDescuento {
  id?: number;
  descripcion?: string | null;
  monto?: number | null;
  inscripcion?: IInscripcion | null;
}

export class InscripcionDescuento implements IInscripcionDescuento {
  constructor(
    public id?: number,
    public descripcion?: string | null,
    public monto?: number | null,
    public inscripcion?: IInscripcion | null
  ) {}
}

export function getInscripcionDescuentoIdentifier(inscripcionDescuento: IInscripcionDescuento): number | undefined {
  return inscripcionDescuento.id;
}
