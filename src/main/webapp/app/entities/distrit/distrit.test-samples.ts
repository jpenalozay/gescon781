import { IDistrit, NewDistrit } from './distrit.model';

export const sampleWithRequiredData: IDistrit = {
  id: 97071,
};

export const sampleWithPartialData: IDistrit = {
  id: 42908,
  provincia: 'compuesto Genérico Galicia',
};

export const sampleWithFullData: IDistrit = {
  id: 20489,
  departamento: 'Inteligente homogénea',
  provincia: 'Peso',
  distrito: 'Pelota withdrawal Joyería',
  ubigeo: 'Electrónica Municipio Cantabria',
};

export const sampleWithNewData: NewDistrit = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
