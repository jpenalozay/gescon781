import dayjs from 'dayjs/esm';
import { IInscripcionPago } from 'app/entities/inscripcion-pago/inscripcion-pago.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoDocumentoVenta } from 'app/entities/enumerations/tipo-documento-venta.model';

export interface ISucursalSerie {
  id?: number;
  activo?: Estado;
  tipoDocumento?: TipoDocumentoVenta;
  serie?: string;
  fechaEmision?: dayjs.Dayjs | null;
  numeroMaximo?: number | null;
  numeroUltimo?: number;
  inscripcionPagos?: IInscripcionPago[] | null;
  sucursal?: ISucursal;
}

export class SucursalSerie implements ISucursalSerie {
  constructor(
    public id?: number,
    public activo?: Estado,
    public tipoDocumento?: TipoDocumentoVenta,
    public serie?: string,
    public fechaEmision?: dayjs.Dayjs | null,
    public numeroMaximo?: number | null,
    public numeroUltimo?: number,
    public inscripcionPagos?: IInscripcionPago[] | null,
    public sucursal?: ISucursal
  ) {}
}

export function getSucursalSerieIdentifier(sucursalSerie: ISucursalSerie): number | undefined {
  return sucursalSerie.id;
}
