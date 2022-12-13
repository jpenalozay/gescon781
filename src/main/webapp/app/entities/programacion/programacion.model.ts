import dayjs from 'dayjs/esm';
import { IProgramacionDeshabilitacion } from 'app/entities/programacion-deshabilitacion/programacion-deshabilitacion.model';
import { IHorario } from 'app/entities/horario/horario.model';
import { IDia } from 'app/entities/dia/dia.model';
import { IHorarioCatalogo } from 'app/entities/horario-catalogo/horario-catalogo.model';
import { IProfesor } from 'app/entities/profesor/profesor.model';
import { IAutomovil } from 'app/entities/automovil/automovil.model';
import { ProgramacionEstado } from 'app/entities/enumerations/programacion-estado.model';

export interface IProgramacion {
  id?: number;
  estado?: ProgramacionEstado;
  codigo?: string;
  fechaInicio?: dayjs.Dayjs | null;
  fechaFin?: dayjs.Dayjs | null;
  deshabilitaciones?: number | null;
  fecha?: dayjs.Dayjs | null;
  nombreUsuario?: string | null;
  programacionDeshabilitacions?: IProgramacionDeshabilitacion[] | null;
  horarios?: IHorario[] | null;
  dias?: IDia[] | null;
  horarioCatalogos?: IHorarioCatalogo[] | null;
  profesor?: IProfesor;
  automovil?: IAutomovil;
}

export class Programacion implements IProgramacion {
  constructor(
    public id?: number,
    public estado?: ProgramacionEstado,
    public codigo?: string,
    public fechaInicio?: dayjs.Dayjs | null,
    public fechaFin?: dayjs.Dayjs | null,
    public deshabilitaciones?: number | null,
    public fecha?: dayjs.Dayjs | null,
    public nombreUsuario?: string | null,
    public programacionDeshabilitacions?: IProgramacionDeshabilitacion[] | null,
    public horarios?: IHorario[] | null,
    public dias?: IDia[] | null,
    public horarioCatalogos?: IHorarioCatalogo[] | null,
    public profesor?: IProfesor,
    public automovil?: IAutomovil
  ) {}
}

export function getProgramacionIdentifier(programacion: IProgramacion): number | undefined {
  return programacion.id;
}
