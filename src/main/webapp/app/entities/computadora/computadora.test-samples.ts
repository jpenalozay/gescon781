import { Estado } from 'app/entities/enumerations/estado.model';
import { ComputadoraTipo } from 'app/entities/enumerations/computadora-tipo.model';

import { IComputadora, NewComputadora } from './computadora.model';

export const sampleWithRequiredData: IComputadora = {
  id: 53213,
  nombre: 'application open-source',
  nombreCorto: 'input',
  descripcion: 'Sopa',
  estadoComputadora: Estado['HABILITADO'],
  mac: '1080p previsión Electrónica',
  tipo: ComputadoraTipo['OTRO'],
};

export const sampleWithPartialData: IComputadora = {
  id: 37312,
  nombre: 'Deportes Ordenador Dollar',
  nombreCorto: 'Amarillo online Loan',
  descripcion: 'Metal Artesanal',
  estadoComputadora: Estado['HABILITADO'],
  mac: 'Conjunto Deportes',
  tipo: ComputadoraTipo['SERVIDOR'],
};

export const sampleWithFullData: IComputadora = {
  id: 18260,
  nombre: 'transmit Negro connecting',
  nombreCorto: 'relationships Sopa',
  descripcion: 'Refinado SDD Especialista',
  estadoComputadora: Estado['HABILITADO'],
  mac: 'firmware',
  tipo: ComputadoraTipo['CELULAR'],
};

export const sampleWithNewData: NewComputadora = {
  nombre: 'Refinado',
  nombreCorto: 'Explanada',
  descripcion: 'Re-contextualizado proactive alianza',
  estadoComputadora: Estado['DESHABILITADO'],
  mac: 'Director Queso',
  tipo: ComputadoraTipo['LAPTOP'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
