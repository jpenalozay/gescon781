import { Estado } from 'app/entities/enumerations/estado.model';
import { HorarioTipo } from 'app/entities/enumerations/horario-tipo.model';

import { IHorarioDeshabilitacion, NewHorarioDeshabilitacion } from './horario-deshabilitacion.model';

export const sampleWithRequiredData: IHorarioDeshabilitacion = {
  id: 79580,
  activo: Estado['HABILITADO'],
  tipo: HorarioTipo['POR_CONFIRMAR'],
};

export const sampleWithPartialData: IHorarioDeshabilitacion = {
  id: 28734,
  activo: Estado['DESHABILITADO'],
  tipo: HorarioTipo['ADMINISTRACION'],
};

export const sampleWithFullData: IHorarioDeshabilitacion = {
  id: 34621,
  activo: Estado['DESHABILITADO'],
  tipo: HorarioTipo['ALUMNO'],
};

export const sampleWithNewData: NewHorarioDeshabilitacion = {
  activo: Estado['DESHABILITADO'],
  tipo: HorarioTipo['POR_CONFIRMAR'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
