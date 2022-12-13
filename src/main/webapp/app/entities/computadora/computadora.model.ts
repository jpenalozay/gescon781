import { IUsuario } from 'app/entities/usuario/usuario.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { ComputadoraTipo } from 'app/entities/enumerations/computadora-tipo.model';

export interface IComputadora {
  id?: number;
  nombre?: string;
  nombreCorto?: string;
  descripcion?: string;
  estadoComputadora?: Estado;
  mac?: string;
  tipo?: ComputadoraTipo;
  usuarios?: IUsuario[] | null;
}

export class Computadora implements IComputadora {
  constructor(
    public id?: number,
    public nombre?: string,
    public nombreCorto?: string,
    public descripcion?: string,
    public estadoComputadora?: Estado,
    public mac?: string,
    public tipo?: ComputadoraTipo,
    public usuarios?: IUsuario[] | null
  ) {}
}

export function getComputadoraIdentifier(computadora: IComputadora): number | undefined {
  return computadora.id;
}
