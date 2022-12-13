import { ICargo } from 'app/entities/cargo/cargo.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoUnidadOrganizativa } from 'app/entities/enumerations/tipo-unidad-organizativa.model';

export interface IArea {
  id?: number;
  activo?: Estado;
  codigo?: string;
  tipo?: TipoUnidadOrganizativa;
  nombre?: string;
  nombreCorto?: string;
  areas?: IArea[] | null;
  cargos?: ICargo[] | null;
  sucursal?: ISucursal;
  areaSuperior?: IArea | null;
}

export class Area implements IArea {
  constructor(
    public id?: number,
    public activo?: Estado,
    public codigo?: string,
    public tipo?: TipoUnidadOrganizativa,
    public nombre?: string,
    public nombreCorto?: string,
    public areas?: IArea[] | null,
    public cargos?: ICargo[] | null,
    public sucursal?: ISucursal,
    public areaSuperior?: IArea | null
  ) {}
}

export function getAreaIdentifier(area: IArea): number | undefined {
  return area.id;
}
