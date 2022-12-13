import dayjs from 'dayjs/esm';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { ISucursalSerie } from 'app/entities/sucursal-serie/sucursal-serie.model';
import { InscripcionFormaPago } from 'app/entities/enumerations/inscripcion-forma-pago.model';

export interface IInscripcionPago {
  id?: number;
  formaPago?: InscripcionFormaPago;
  monto?: number;
  fecha?: dayjs.Dayjs;
  codigoOP?: string | null;
  numeroDocumento?: number;
  plazoPago?: number | null;
  inscripcion?: IInscripcion;
  serie?: ISucursalSerie;
}

export class InscripcionPago implements IInscripcionPago {
  constructor(
    public id?: number,
    public formaPago?: InscripcionFormaPago,
    public monto?: number,
    public fecha?: dayjs.Dayjs,
    public codigoOP?: string | null,
    public numeroDocumento?: number,
    public plazoPago?: number | null,
    public inscripcion?: IInscripcion,
    public serie?: ISucursalSerie
  ) {}
}

export function getInscripcionPagoIdentifier(inscripcionPago: IInscripcionPago): number | undefined {
  return inscripcionPago.id;
}
