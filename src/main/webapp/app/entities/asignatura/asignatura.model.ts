import { IInscripcionDetalle } from 'app/entities/inscripcion-detalle/inscripcion-detalle.model';
import { ILicenciaCategoria } from 'app/entities/licencia-categoria/licencia-categoria.model';
import { IAsignaturaAdiciones } from 'app/entities/asignatura-adiciones/asignatura-adiciones.model';
import { ITeoriaHorarioCatalogo } from 'app/entities/teoria-horario-catalogo/teoria-horario-catalogo.model';
import { IAsignaturaRequisito } from 'app/entities/asignatura-requisito/asignatura-requisito.model';
import { ICurso } from 'app/entities/curso/curso.model';
import { Estado } from 'app/entities/enumerations/estado.model';

export interface IAsignatura {
  id?: number;
  activo?: Estado;
  nombre?: string;
  nombreCorto?: string;
  descripcion?: string | null;
  documento?: string | null;
  horasTeoricas?: number | null;
  horasPracticas?: number | null;
  numeroClasesTeoria?: number | null;
  numeroClasesPractica?: number | null;
  vigencia?: number | null;
  costo?: number;
  imagenContentType?: string | null;
  imagen?: string | null;
  inscripcionDetalles?: IInscripcionDetalle[] | null;
  categorias?: ILicenciaCategoria[] | null;
  adicionals?: IAsignaturaAdiciones[] | null;
  horarios?: ITeoriaHorarioCatalogo[] | null;
  asignaturaRequisitos?: IAsignaturaRequisito[] | null;
  curso?: ICurso;
}

export class Asignatura implements IAsignatura {
  constructor(
    public id?: number,
    public activo?: Estado,
    public nombre?: string,
    public nombreCorto?: string,
    public descripcion?: string | null,
    public documento?: string | null,
    public horasTeoricas?: number | null,
    public horasPracticas?: number | null,
    public numeroClasesTeoria?: number | null,
    public numeroClasesPractica?: number | null,
    public vigencia?: number | null,
    public costo?: number,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public inscripcionDetalles?: IInscripcionDetalle[] | null,
    public categorias?: ILicenciaCategoria[] | null,
    public adicionals?: IAsignaturaAdiciones[] | null,
    public horarios?: ITeoriaHorarioCatalogo[] | null,
    public asignaturaRequisitos?: IAsignaturaRequisito[] | null,
    public curso?: ICurso
  ) {}
}

export function getAsignaturaIdentifier(asignatura: IAsignatura): number | undefined {
  return asignatura.id;
}
