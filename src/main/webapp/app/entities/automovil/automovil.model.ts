import dayjs from 'dayjs/esm';
import { IProgramacion } from 'app/entities/programacion/programacion.model';
import { IHorario } from 'app/entities/horario/horario.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { AutomovilTipo } from 'app/entities/enumerations/automovil-tipo.model';
import { AutomovilCaja } from 'app/entities/enumerations/automovil-caja.model';

export interface IAutomovil {
  id?: number;
  activo?: Estado;
  codigo?: string;
  nombre?: string | null;
  tipo?: AutomovilTipo;
  placa?: string;
  marca?: string | null;
  modelo?: string | null;
  anio?: string | null;
  soatVencimiento?: dayjs.Dayjs | null;
  revisionTecnicaVencimiento?: dayjs.Dayjs | null;
  caja?: AutomovilCaja | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  programacions?: IProgramacion[] | null;
  horarios?: IHorario[] | null;
}

export class Automovil implements IAutomovil {
  constructor(
    public id?: number,
    public activo?: Estado,
    public codigo?: string,
    public nombre?: string | null,
    public tipo?: AutomovilTipo,
    public placa?: string,
    public marca?: string | null,
    public modelo?: string | null,
    public anio?: string | null,
    public soatVencimiento?: dayjs.Dayjs | null,
    public revisionTecnicaVencimiento?: dayjs.Dayjs | null,
    public caja?: AutomovilCaja | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public programacions?: IProgramacion[] | null,
    public horarios?: IHorario[] | null
  ) {}
}

export function getAutomovilIdentifier(automovil: IAutomovil): number | undefined {
  return automovil.id;
}
