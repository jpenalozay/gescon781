import dayjs from 'dayjs/esm';
import { IInscripcionPago } from 'app/entities/inscripcion-pago/inscripcion-pago.model';
import { IInscripcionAdicional } from 'app/entities/inscripcion-adicional/inscripcion-adicional.model';
import { IInscripcionDetalle } from 'app/entities/inscripcion-detalle/inscripcion-detalle.model';
import { IInscripcionDescuento } from 'app/entities/inscripcion-descuento/inscripcion-descuento.model';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { InscripcionEstado } from 'app/entities/enumerations/inscripcion-estado.model';

export interface IInscripcion {
  id?: number;
  codigo?: string;
  estado?: InscripcionEstado;
  numeroDocumento?: number;
  fecha?: dayjs.Dayjs;
  costoTotal?: number | null;
  inscripcionPagos?: IInscripcionPago[] | null;
  inscripcionAdicionals?: IInscripcionAdicional[] | null;
  inscripcionDetalles?: IInscripcionDetalle[] | null;
  insDescuento?: IInscripcionDescuento | null;
  alumno?: IAlumno;
}

export class Inscripcion implements IInscripcion {
  constructor(
    public id?: number,
    public codigo?: string,
    public estado?: InscripcionEstado,
    public numeroDocumento?: number,
    public fecha?: dayjs.Dayjs,
    public costoTotal?: number | null,
    public inscripcionPagos?: IInscripcionPago[] | null,
    public inscripcionAdicionals?: IInscripcionAdicional[] | null,
    public inscripcionDetalles?: IInscripcionDetalle[] | null,
    public insDescuento?: IInscripcionDescuento | null,
    public alumno?: IAlumno
  ) {}
}

export function getInscripcionIdentifier(inscripcion: IInscripcion): number | undefined {
  return inscripcion.id;
}
