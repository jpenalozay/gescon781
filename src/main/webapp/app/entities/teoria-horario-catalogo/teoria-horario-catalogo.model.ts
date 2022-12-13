import { IInscripcionDetalle } from 'app/entities/inscripcion-detalle/inscripcion-detalle.model';
import { ITeoria } from 'app/entities/teoria/teoria.model';
import { IAsignatura } from 'app/entities/asignatura/asignatura.model';
import { Estado } from 'app/entities/enumerations/estado.model';

export interface ITeoriaHorarioCatalogo {
  id?: number;
  activo?: Estado;
  nombre?: string;
  nombreCorto?: string;
  descripcion?: string | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  periodo?: string | null;
  anio?: string | null;
  mes?: string | null;
  dia?: string | null;
  horaInicio?: number | null;
  horaFin?: number | null;
  inscripcionDetalles?: IInscripcionDetalle[] | null;
  teorias?: ITeoria[] | null;
  asignaturas?: IAsignatura[] | null;
}

export class TeoriaHorarioCatalogo implements ITeoriaHorarioCatalogo {
  constructor(
    public id?: number,
    public activo?: Estado,
    public nombre?: string,
    public nombreCorto?: string,
    public descripcion?: string | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public periodo?: string | null,
    public anio?: string | null,
    public mes?: string | null,
    public dia?: string | null,
    public horaInicio?: number | null,
    public horaFin?: number | null,
    public inscripcionDetalles?: IInscripcionDetalle[] | null,
    public teorias?: ITeoria[] | null,
    public asignaturas?: IAsignatura[] | null
  ) {}
}

export function getTeoriaHorarioCatalogoIdentifier(teoriaHorarioCatalogo: ITeoriaHorarioCatalogo): number | undefined {
  return teoriaHorarioCatalogo.id;
}
