import dayjs from 'dayjs/esm';

import { Estado } from 'app/entities/enumerations/estado.model';

import { IProgramacionDeshabilitacion, NewProgramacionDeshabilitacion } from './programacion-deshabilitacion.model';

export const sampleWithRequiredData: IProgramacionDeshabilitacion = {
  id: 82480,
  activo: Estado['HABILITADO'],
  codigo: 'Soporte a Berkshire',
};

export const sampleWithPartialData: IProgramacionDeshabilitacion = {
  id: 16849,
  activo: Estado['HABILITADO'],
  codigo: 'invoice',
  fecha: dayjs('2022-11-23T21:53'),
};

export const sampleWithFullData: IProgramacionDeshabilitacion = {
  id: 10718,
  activo: Estado['DESHABILITADO'],
  codigo: 'navigating XML',
  descripcion: 'deposit Somali open-source',
  fecha: dayjs('2022-11-23T04:04'),
  nombreUsuario: 'Consultor Decoración Directo',
};

export const sampleWithNewData: NewProgramacionDeshabilitacion = {
  activo: Estado['DESHABILITADO'],
  codigo: 'sistémica',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
