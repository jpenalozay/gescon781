import { Estado } from 'app/entities/enumerations/estado.model';

import { ICargo, NewCargo } from './cargo.model';

export const sampleWithRequiredData: ICargo = {
  id: 96536,
  activo: Estado['DESHABILITADO'],
  codigo: 'Vers',
  nombre: 'Bedfordshire Jamaica digital',
  nombreCorto: 'Rojo',
};

export const sampleWithPartialData: ICargo = {
  id: 43890,
  activo: Estado['HABILITADO'],
  codigo: 'Sill',
  nombre: 'Avon Pequeño de',
  nombreCorto: 'connecting División application',
};

export const sampleWithFullData: ICargo = {
  id: 56598,
  activo: Estado['DESHABILITADO'],
  codigo: 'driv',
  nombre: 'multiestado Factores withdrawal',
  nombreCorto: 'redefine Violeta contingencia',
};

export const sampleWithNewData: NewCargo = {
  activo: Estado['DESHABILITADO'],
  codigo: 'Verd',
  nombre: 'Madera Quetzal Cliente',
  nombreCorto: 'Mascotas',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
