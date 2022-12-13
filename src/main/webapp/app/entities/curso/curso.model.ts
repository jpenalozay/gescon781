import { IAsignatura } from 'app/entities/asignatura/asignatura.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { CursoTipo } from 'app/entities/enumerations/curso-tipo.model';

export interface ICurso {
  id?: number;
  activo?: Estado;
  tipo?: CursoTipo;
  nombre?: string;
  nombreCorto?: string;
  descripcion?: string | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  asignaturas?: IAsignatura[] | null;
}

export class Curso implements ICurso {
  constructor(
    public id?: number,
    public activo?: Estado,
    public tipo?: CursoTipo,
    public nombre?: string,
    public nombreCorto?: string,
    public descripcion?: string | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public asignaturas?: IAsignatura[] | null
  ) {}
}

export function getCursoIdentifier(curso: ICurso): number | undefined {
  return curso.id;
}
