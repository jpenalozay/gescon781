import dayjs from 'dayjs/esm';

import { InscripcionEstado } from 'app/entities/enumerations/inscripcion-estado.model';

import { IInscripcion, NewInscripcion } from './inscripcion.model';

export const sampleWithRequiredData: IInscripcion = {
  id: 32203,
  codigo: 'auxiliary',
  estado: InscripcionEstado['CANCELADO'],
  numeroDocumento: 42902,
  fecha: dayjs('2022-11-23T18:26'),
};

export const sampleWithPartialData: IInscripcion = {
  id: 31652,
  codigo: 'Barranco ',
  estado: InscripcionEstado['EN_DEUDA'],
  numeroDocumento: 25533,
  fecha: dayjs('2022-11-23T07:10'),
  costoTotal: 6533,
};

export const sampleWithFullData: IInscripcion = {
  id: 84893,
  codigo: 'modularXX',
  estado: InscripcionEstado['EN_DEUDA'],
  numeroDocumento: 81699,
  fecha: dayjs('2022-11-23T19:10'),
  costoTotal: 4453,
};

export const sampleWithNewData: NewInscripcion = {
  codigo: 'Buckingha',
  estado: InscripcionEstado['CANCELADO'],
  numeroDocumento: 37824,
  fecha: dayjs('2022-11-23T21:23'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
