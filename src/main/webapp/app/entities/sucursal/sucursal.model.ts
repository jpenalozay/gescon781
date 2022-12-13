import dayjs from 'dayjs/esm';
import { IArea } from 'app/entities/area/area.model';
import { ISucursalSerie } from 'app/entities/sucursal-serie/sucursal-serie.model';
import { IDistrit } from 'app/entities/distrit/distrit.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';

export interface ISucursal {
  id?: number;
  activo?: Estado;
  codigo?: string;
  central?: SiNo;
  nombre?: string;
  nombreCorto?: string;
  nombreAbreviado?: string;
  fechaInicio?: dayjs.Dayjs | null;
  telefono?: string | null;
  telefono1?: string | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  direccion?: string;
  areas?: IArea[] | null;
  sucursalSeries?: ISucursalSerie[] | null;
  distrito?: IDistrit;
  usuarios?: IUsuario[] | null;
}

export class Sucursal implements ISucursal {
  constructor(
    public id?: number,
    public activo?: Estado,
    public codigo?: string,
    public central?: SiNo,
    public nombre?: string,
    public nombreCorto?: string,
    public nombreAbreviado?: string,
    public fechaInicio?: dayjs.Dayjs | null,
    public telefono?: string | null,
    public telefono1?: string | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public direccion?: string,
    public areas?: IArea[] | null,
    public sucursalSeries?: ISucursalSerie[] | null,
    public distrito?: IDistrit,
    public usuarios?: IUsuario[] | null
  ) {}
}

export function getSucursalIdentifier(sucursal: ISucursal): number | undefined {
  return sucursal.id;
}
