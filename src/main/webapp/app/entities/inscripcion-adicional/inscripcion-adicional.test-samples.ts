import { IInscripcionAdicional, NewInscripcionAdicional } from './inscripcion-adicional.model';

export const sampleWithRequiredData: IInscripcionAdicional = {
  id: 78831,
};

export const sampleWithPartialData: IInscripcionAdicional = {
  id: 711,
  descripcion: 'Ingeniero portal parsing',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
  documento: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IInscripcionAdicional = {
  id: 33684,
  descripcion: 'Rioja utilización',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
  documento: '../fake-data/blob/hipster.txt',
  cantidad: 'Islas',
  costo: 43640,
};

export const sampleWithNewData: NewInscripcionAdicional = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
