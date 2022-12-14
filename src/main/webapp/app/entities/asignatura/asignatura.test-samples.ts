import { Estado } from 'app/entities/enumerations/estado.model';

import { IAsignatura, NewAsignatura } from './asignatura.model';

export const sampleWithRequiredData: IAsignatura = {
  id: 92047,
  activo: Estado['DESHABILITADO'],
  nombre: 'Buckinghamshire redundant indexing',
  nombreCorto: 'Mancha solutions',
  costo: 2032,
};

export const sampleWithPartialData: IAsignatura = {
  id: 27405,
  activo: Estado['HABILITADO'],
  nombre: 'Ladrillo',
  nombreCorto: 'primary microchip',
  descripcion: 'Avon Bermuda engage',
  documento: '../fake-data/blob/hipster.txt',
  horasTeoricas: 4434,
  horasPracticas: 11347,
  numeroClasesTeoria: 66724,
  numeroClasesPractica: 2757,
  vigencia: 32526,
  costo: 98386,
};

export const sampleWithFullData: IAsignatura = {
  id: 37395,
  activo: Estado['DESHABILITADO'],
  nombre: 'Travesía invoice Money',
  nombreCorto: 'deposit cohesiva',
  descripcion: 'scalable',
  documento: '../fake-data/blob/hipster.txt',
  horasTeoricas: 40043,
  horasPracticas: 8808,
  numeroClasesTeoria: 23048,
  numeroClasesPractica: 3743,
  vigencia: 72660,
  costo: 27540,
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithNewData: NewAsignatura = {
  activo: Estado['DESHABILITADO'],
  nombre: 'bluetooth Heredado optimize',
  nombreCorto: 'Account',
  costo: 83930,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
