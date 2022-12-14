import { ILicenciaCategoria, NewLicenciaCategoria } from './licencia-categoria.model';

export const sampleWithRequiredData: ILicenciaCategoria = {
  id: 15952,
  categoria: 'maximizada',
};

export const sampleWithPartialData: ILicenciaCategoria = {
  id: 2797,
  categoria: 'mobile',
};

export const sampleWithFullData: ILicenciaCategoria = {
  id: 60470,
  categoria: 'Pantalones',
};

export const sampleWithNewData: NewLicenciaCategoria = {
  categoria: 'back-end',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
