import dayjs from 'dayjs/esm';
import { IHorario } from 'app/entities/horario/horario.model';
import { IProgramacionDeshabilitacion } from 'app/entities/programacion-deshabilitacion/programacion-deshabilitacion.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';

export interface IFecha {
  id?: number;
  fecha?: dayjs.Dayjs;
  dia?: number;
  mes?: number;
  anio?: number;
  diaNombre?: string;
  diaNombreCorto?: string;
  feriado?: SiNo | null;
  laboral?: SiNo | null;
  finSemana?: SiNo | null;
  horarios?: IHorario[] | null;
  programacionDeshabilitacions?: IProgramacionDeshabilitacion[] | null;
}

export class Fecha implements IFecha {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs,
    public dia?: number,
    public mes?: number,
    public anio?: number,
    public diaNombre?: string,
    public diaNombreCorto?: string,
    public feriado?: SiNo | null,
    public laboral?: SiNo | null,
    public finSemana?: SiNo | null,
    public horarios?: IHorario[] | null,
    public programacionDeshabilitacions?: IProgramacionDeshabilitacion[] | null
  ) {}
}

export function getFechaIdentifier(fecha: IFecha): number | undefined {
  return fecha.id;
}
