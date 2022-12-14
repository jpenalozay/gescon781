import { Estado } from 'app/entities/enumerations/estado.model';

import { IAsignaturaAdiciones, NewAsignaturaAdiciones } from './asignatura-adiciones.model';

export const sampleWithRequiredData: IAsignaturaAdiciones = {
  id: 69217,
  activo: Estado['DESHABILITADO'],
  nombre: 'Humano actitud Eslovaquia',
  nombreCorto: 'cero',
};

export const sampleWithPartialData: IAsignaturaAdiciones = {
  id: 51555,
  activo: Estado['HABILITADO'],
  nombre: 'Belize FTP',
  nombreCorto: 'wireless Plástico Sopa',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithFullData: IAsignaturaAdiciones = {
  id: 98273,
  activo: Estado['HABILITADO'],
  nombre: 'Navarra',
  nombreCorto: 'JSON',
  descripcion: 'B2B Metal',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithNewData: NewAsignaturaAdiciones = {
  activo: Estado['DESHABILITADO'],
  nombre: 'Cambridgeshire República',
  nombreCorto: 'RAM Dollar Implementación',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
