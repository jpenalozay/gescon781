import dayjs from 'dayjs/esm';

import { IInscripcionDetalle, NewInscripcionDetalle } from './inscripcion-detalle.model';

export const sampleWithRequiredData: IInscripcionDetalle = {
  id: 25594,
};

export const sampleWithPartialData: IInscripcionDetalle = {
  id: 440,
};

export const sampleWithFullData: IInscripcionDetalle = {
  id: 94895,
  codigo: 'Sorprendente',
  fechaInicio: dayjs('2022-11-24'),
};

export const sampleWithNewData: NewInscripcionDetalle = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
