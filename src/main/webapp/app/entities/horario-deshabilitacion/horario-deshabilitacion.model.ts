import { IProgramacionDeshabilitacion } from 'app/entities/programacion-deshabilitacion/programacion-deshabilitacion.model';
import { IHorario } from 'app/entities/horario/horario.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { HorarioTipo } from 'app/entities/enumerations/horario-tipo.model';

export interface IHorarioDeshabilitacion {
  id?: number;
  activo?: Estado;
  tipo?: HorarioTipo;
  programacionDeshabilitacion?: IProgramacionDeshabilitacion;
  horario?: IHorario | null;
}

export class HorarioDeshabilitacion implements IHorarioDeshabilitacion {
  constructor(
    public id?: number,
    public activo?: Estado,
    public tipo?: HorarioTipo,
    public programacionDeshabilitacion?: IProgramacionDeshabilitacion,
    public horario?: IHorario | null
  ) {}
}

export function getHorarioDeshabilitacionIdentifier(horarioDeshabilitacion: IHorarioDeshabilitacion): number | undefined {
  return horarioDeshabilitacion.id;
}
