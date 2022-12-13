import dayjs from 'dayjs/esm';
import { IHorarioDeshabilitacion } from 'app/entities/horario-deshabilitacion/horario-deshabilitacion.model';
import { IFecha } from 'app/entities/fecha/fecha.model';
import { IHorarioCatalogo } from 'app/entities/horario-catalogo/horario-catalogo.model';
import { IProgramacion } from 'app/entities/programacion/programacion.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { Estado } from 'app/entities/enumerations/estado.model';

export interface IProgramacionDeshabilitacion {
  id?: number;
  activo?: Estado;
  codigo?: string;
  descripcion?: string | null;
  fecha?: dayjs.Dayjs | null;
  nombreUsuario?: string | null;
  horarioDeshabilitaciones?: IHorarioDeshabilitacion[] | null;
  fechas?: IFecha[] | null;
  horarioCatalogos?: IHorarioCatalogo[] | null;
  programacion?: IProgramacion;
  usuario?: IUsuario | null;
}

export class ProgramacionDeshabilitacion implements IProgramacionDeshabilitacion {
  constructor(
    public id?: number,
    public activo?: Estado,
    public codigo?: string,
    public descripcion?: string | null,
    public fecha?: dayjs.Dayjs | null,
    public nombreUsuario?: string | null,
    public horarioDeshabilitaciones?: IHorarioDeshabilitacion[] | null,
    public fechas?: IFecha[] | null,
    public horarioCatalogos?: IHorarioCatalogo[] | null,
    public programacion?: IProgramacion,
    public usuario?: IUsuario | null
  ) {}
}

export function getProgramacionDeshabilitacionIdentifier(programacionDeshabilitacion: IProgramacionDeshabilitacion): number | undefined {
  return programacionDeshabilitacion.id;
}
