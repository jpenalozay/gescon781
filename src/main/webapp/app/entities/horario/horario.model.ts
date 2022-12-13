import dayjs from 'dayjs/esm';
import { IHorarioDeshabilitacion } from 'app/entities/horario-deshabilitacion/horario-deshabilitacion.model';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { IProfesor } from 'app/entities/profesor/profesor.model';
import { IProgramacion } from 'app/entities/programacion/programacion.model';
import { IFecha } from 'app/entities/fecha/fecha.model';
import { IHorarioCatalogo } from 'app/entities/horario-catalogo/horario-catalogo.model';
import { IAutomovil } from 'app/entities/automovil/automovil.model';
import { ILugarSalida } from 'app/entities/lugar-salida/lugar-salida.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { HorarioTipo } from 'app/entities/enumerations/horario-tipo.model';

export interface IHorario {
  id?: number;
  activo?: Estado;
  tipo?: HorarioTipo;
  fechaDia?: dayjs.Dayjs | null;
  fechaDiaSem?: number | null;
  horarioDeshabilitacions?: IHorarioDeshabilitacion[] | null;
  alumno?: IAlumno | null;
  instructor?: IProfesor | null;
  programacion?: IProgramacion;
  fecha?: IFecha;
  horarioCatalogo?: IHorarioCatalogo;
  automovil?: IAutomovil;
  lugarSalida?: ILugarSalida | null;
}

export class Horario implements IHorario {
  constructor(
    public id?: number,
    public activo?: Estado,
    public tipo?: HorarioTipo,
    public fechaDia?: dayjs.Dayjs | null,
    public fechaDiaSem?: number | null,
    public horarioDeshabilitacions?: IHorarioDeshabilitacion[] | null,
    public alumno?: IAlumno | null,
    public instructor?: IProfesor | null,
    public programacion?: IProgramacion,
    public fecha?: IFecha,
    public horarioCatalogo?: IHorarioCatalogo,
    public automovil?: IAutomovil,
    public lugarSalida?: ILugarSalida | null
  ) {}
}

export function getHorarioIdentifier(horario: IHorario): number | undefined {
  return horario.id;
}
