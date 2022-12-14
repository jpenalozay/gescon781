import dayjs from 'dayjs/esm';

import { Estado } from 'app/entities/enumerations/estado.model';
import { HorarioTipo } from 'app/entities/enumerations/horario-tipo.model';

import { IHorario, NewHorario } from './horario.model';

export const sampleWithRequiredData: IHorario = {
  id: 42529,
  activo: Estado['HABILITADO'],
  tipo: HorarioTipo['ALUMNO'],
};

export const sampleWithPartialData: IHorario = {
  id: 76725,
  activo: Estado['DESHABILITADO'],
  tipo: HorarioTipo['POR_CONFIRMAR'],
  fechaDia: dayjs('2022-11-24'),
  fechaDiaSem: 5,
};

export const sampleWithFullData: IHorario = {
  id: 40546,
  activo: Estado['HABILITADO'],
  tipo: HorarioTipo['ALUMNO'],
  fechaDia: dayjs('2022-11-23'),
  fechaDiaSem: 2,
};

export const sampleWithNewData: NewHorario = {
  activo: Estado['DESHABILITADO'],
  tipo: HorarioTipo['POR_CONFIRMAR'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
