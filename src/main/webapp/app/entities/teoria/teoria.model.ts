import { ITeoriaHorarioCatalogo } from 'app/entities/teoria-horario-catalogo/teoria-horario-catalogo.model';
import { Estado } from 'app/entities/enumerations/estado.model';

export interface ITeoria {
  id?: number;
  activo?: Estado;
  nombre?: string;
  nombreCorto?: string;
  descripcion?: string | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  horarios?: ITeoriaHorarioCatalogo[] | null;
}

export class Teoria implements ITeoria {
  constructor(
    public id?: number,
    public activo?: Estado,
    public nombre?: string,
    public nombreCorto?: string,
    public descripcion?: string | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public horarios?: ITeoriaHorarioCatalogo[] | null
  ) {}
}

export function getTeoriaIdentifier(teoria: ITeoria): number | undefined {
  return teoria.id;
}
