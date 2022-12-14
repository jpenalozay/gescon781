import { Estado } from 'app/entities/enumerations/estado.model';
import { CursoTipo } from 'app/entities/enumerations/curso-tipo.model';

import { ICurso, NewCurso } from './curso.model';

export const sampleWithRequiredData: ICurso = {
  id: 11617,
  activo: Estado['DESHABILITADO'],
  tipo: CursoTipo['REGULAR'],
  nombre: 'Metical FTP extend',
  nombreCorto: 'generación Bedfordshire',
};

export const sampleWithPartialData: ICurso = {
  id: 99527,
  activo: Estado['DESHABILITADO'],
  tipo: CursoTipo['PROMOCIONAL'],
  nombre: 'productividad',
  nombreCorto: 'intangible Atún',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithFullData: ICurso = {
  id: 59340,
  activo: Estado['HABILITADO'],
  tipo: CursoTipo['REGULAR'],
  nombre: 'compress',
  nombreCorto: 'Respuesta Bedfordshire',
  descripcion: 'Cine Senior',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithNewData: NewCurso = {
  activo: Estado['DESHABILITADO'],
  tipo: CursoTipo['REGULAR'],
  nombre: 'Hormigon parsing',
  nombreCorto: 'deposit payment THX',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
