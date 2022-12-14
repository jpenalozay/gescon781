import dayjs from 'dayjs/esm';

import { ProgramacionEstado } from 'app/entities/enumerations/programacion-estado.model';

import { IProgramacion, NewProgramacion } from './programacion.model';

export const sampleWithRequiredData: IProgramacion = {
  id: 31533,
  estado: ProgramacionEstado['PROGRAMADO'],
  codigo: 'Desarrollador Amarillo Juguetería',
};

export const sampleWithPartialData: IProgramacion = {
  id: 2790,
  estado: ProgramacionEstado['DESHABILITADO'],
  codigo: 'Solar Guantes',
  fechaInicio: dayjs('2022-11-23'),
  fechaFin: dayjs('2022-11-23'),
  fecha: dayjs('2022-11-23T17:42'),
};

export const sampleWithFullData: IProgramacion = {
  id: 95454,
  estado: ProgramacionEstado['DESHABILITADO_ENPARTE'],
  codigo: 'enhance cohesiva Mesa',
  fechaInicio: dayjs('2022-11-23'),
  fechaFin: dayjs('2022-11-23'),
  deshabilitaciones: 54,
  fecha: dayjs('2022-11-24T03:04'),
  nombreUsuario: 'Inteligente',
};

export const sampleWithNewData: NewProgramacion = {
  estado: ProgramacionEstado['DESHABILITADO'],
  codigo: 'generateX',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
