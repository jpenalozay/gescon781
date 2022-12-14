import { IInscripcionDescuento, NewInscripcionDescuento } from './inscripcion-descuento.model';

export const sampleWithRequiredData: IInscripcionDescuento = {
  id: 3497,
};

export const sampleWithPartialData: IInscripcionDescuento = {
  id: 44707,
  descripcion: 'utilize Marroquinería',
};

export const sampleWithFullData: IInscripcionDescuento = {
  id: 17331,
  descripcion: 'optimizada Portugal analizada',
  monto: 94562,
};

export const sampleWithNewData: NewInscripcionDescuento = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
