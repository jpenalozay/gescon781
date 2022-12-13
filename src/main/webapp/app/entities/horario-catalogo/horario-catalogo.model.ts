import { IHorario } from 'app/entities/horario/horario.model';
import { IProgramacion } from 'app/entities/programacion/programacion.model';
import { IProgramacionDeshabilitacion } from 'app/entities/programacion-deshabilitacion/programacion-deshabilitacion.model';
import { Estado } from 'app/entities/enumerations/estado.model';

export interface IHorarioCatalogo {
  id?: number;
  activo?: Estado;
  codigo?: number;
  horaInicio?: string;
  horaFin?: string;
  descripcion?: string;
  horarios?: IHorario[] | null;
  programacions?: IProgramacion[] | null;
  programacionDeshabilitaciones?: IProgramacionDeshabilitacion[] | null;
}

export class HorarioCatalogo implements IHorarioCatalogo {
  constructor(
    public id?: number,
    public activo?: Estado,
    public codigo?: number,
    public horaInicio?: string,
    public horaFin?: string,
    public descripcion?: string,
    public horarios?: IHorario[] | null,
    public programacions?: IProgramacion[] | null,
    public programacionDeshabilitaciones?: IProgramacionDeshabilitacion[] | null
  ) {}
}

export function getHorarioCatalogoIdentifier(horarioCatalogo: IHorarioCatalogo): number | undefined {
  return horarioCatalogo.id;
}
