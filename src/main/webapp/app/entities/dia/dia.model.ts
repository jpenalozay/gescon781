import { IProgramacion } from 'app/entities/programacion/programacion.model';

export interface IDia {
  id?: number;
  nombre?: string;
  nombreCorto?: string;
  programacions?: IProgramacion[] | null;
}

export class Dia implements IDia {
  constructor(public id?: number, public nombre?: string, public nombreCorto?: string, public programacions?: IProgramacion[] | null) {}
}

export function getDiaIdentifier(dia: IDia): number | undefined {
  return dia.id;
}
