import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { IPersona } from 'app/entities/persona/persona.model';

export interface IDistrit {
  id?: number;
  departamento?: string | null;
  provincia?: string | null;
  distrito?: string | null;
  ubigeo?: string | null;
  sucursals?: ISucursal[] | null;
  personas?: IPersona[] | null;
}

export class Distrit implements IDistrit {
  constructor(
    public id?: number,
    public departamento?: string | null,
    public provincia?: string | null,
    public distrito?: string | null,
    public ubigeo?: string | null,
    public sucursals?: ISucursal[] | null,
    public personas?: IPersona[] | null
  ) {}
}

export function getDistritIdentifier(distrit: IDistrit): number | undefined {
  return distrit.id;
}
