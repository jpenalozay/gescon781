import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { IArea } from 'app/entities/area/area.model';
import { Estado } from 'app/entities/enumerations/estado.model';

export interface ICargo {
  id?: number;
  activo?: Estado;
  codigo?: string;
  nombre?: string;
  nombreCorto?: string;
  cargos?: ICargo[] | null;
  empleados?: IEmpleado[] | null;
  areaPerteneciente?: IArea;
  cargoSuperior?: ICargo | null;
}

export class Cargo implements ICargo {
  constructor(
    public id?: number,
    public activo?: Estado,
    public codigo?: string,
    public nombre?: string,
    public nombreCorto?: string,
    public cargos?: ICargo[] | null,
    public empleados?: IEmpleado[] | null,
    public areaPerteneciente?: IArea,
    public cargoSuperior?: ICargo | null
  ) {}
}

export function getCargoIdentifier(cargo: ICargo): number | undefined {
  return cargo.id;
}
