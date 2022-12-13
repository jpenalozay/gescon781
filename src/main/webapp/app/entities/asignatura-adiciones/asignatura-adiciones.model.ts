import { IAsignatura } from 'app/entities/asignatura/asignatura.model';
import { Estado } from 'app/entities/enumerations/estado.model';

export interface IAsignaturaAdiciones {
  id?: number;
  activo?: Estado;
  nombre?: string;
  nombreCorto?: string;
  descripcion?: string | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  asignaturas?: IAsignatura[] | null;
}

export class AsignaturaAdiciones implements IAsignaturaAdiciones {
  constructor(
    public id?: number,
    public activo?: Estado,
    public nombre?: string,
    public nombreCorto?: string,
    public descripcion?: string | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public asignaturas?: IAsignatura[] | null
  ) {}
}

export function getAsignaturaAdicionesIdentifier(asignaturaAdiciones: IAsignaturaAdiciones): number | undefined {
  return asignaturaAdiciones.id;
}
