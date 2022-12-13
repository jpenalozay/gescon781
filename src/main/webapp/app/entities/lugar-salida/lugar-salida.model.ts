import { IHorario } from 'app/entities/horario/horario.model';

export interface ILugarSalida {
  id?: number;
  nombre?: string | null;
  horarios?: IHorario[] | null;
}

export class LugarSalida implements ILugarSalida {
  constructor(public id?: number, public nombre?: string | null, public horarios?: IHorario[] | null) {}
}

export function getLugarSalidaIdentifier(lugarSalida: ILugarSalida): number | undefined {
  return lugarSalida.id;
}
