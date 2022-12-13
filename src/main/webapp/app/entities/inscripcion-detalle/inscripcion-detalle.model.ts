import dayjs from 'dayjs/esm';
import { IInscripcionAsignaturaRequisito } from 'app/entities/inscripcion-asignatura-requisito/inscripcion-asignatura-requisito.model';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { IAsignatura } from 'app/entities/asignatura/asignatura.model';
import { ITeoriaHorarioCatalogo } from 'app/entities/teoria-horario-catalogo/teoria-horario-catalogo.model';

export interface IInscripcionDetalle {
  id?: number;
  codigo?: string | null;
  fechaInicio?: dayjs.Dayjs | null;
  inscripcionAsignaturaRequisitos?: IInscripcionAsignaturaRequisito[] | null;
  inscripcion?: IInscripcion;
  asignatura?: IAsignatura;
  horario?: ITeoriaHorarioCatalogo;
}

export class InscripcionDetalle implements IInscripcionDetalle {
  constructor(
    public id?: number,
    public codigo?: string | null,
    public fechaInicio?: dayjs.Dayjs | null,
    public inscripcionAsignaturaRequisitos?: IInscripcionAsignaturaRequisito[] | null,
    public inscripcion?: IInscripcion,
    public asignatura?: IAsignatura,
    public horario?: ITeoriaHorarioCatalogo
  ) {}
}

export function getInscripcionDetalleIdentifier(inscripcionDetalle: IInscripcionDetalle): number | undefined {
  return inscripcionDetalle.id;
}
