import { Estado } from 'app/entities/enumerations/estado.model';

import { ITeoria, NewTeoria } from './teoria.model';

export const sampleWithRequiredData: ITeoria = {
  id: 58397,
  activo: Estado['DESHABILITADO'],
  nombre: 'gráfico',
  nombreCorto: 'India',
};

export const sampleWithPartialData: ITeoria = {
  id: 68872,
  activo: Estado['DESHABILITADO'],
  nombre: 'Canarias Raton Morado',
  nombreCorto: 'Ladrillo',
  descripcion: 'conjunto Fantástico y',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithFullData: ITeoria = {
  id: 57572,
  activo: Estado['DESHABILITADO'],
  nombre: 'sensor',
  nombreCorto: 'reboot ROI Account',
  descripcion: 'up compuesto',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithNewData: NewTeoria = {
  activo: Estado['DESHABILITADO'],
  nombre: 'up Account',
  nombreCorto: 'Cuentas Identidad Austria',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
