import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoRequisito } from 'app/entities/enumerations/tipo-requisito.model';

import { IAsignaturaRequisito, NewAsignaturaRequisito } from './asignatura-requisito.model';

export const sampleWithRequiredData: IAsignaturaRequisito = {
  id: 2900,
  activo: Estado['HABILITADO'],
  tipo: TipoRequisito['OBLIGATORIO'],
  nombre: 'solutions',
};

export const sampleWithPartialData: IAsignaturaRequisito = {
  id: 79670,
  activo: Estado['HABILITADO'],
  tipo: TipoRequisito['OPCIONAL'],
  nombre: 'quantifying cross-platform Profundo',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithFullData: IAsignaturaRequisito = {
  id: 96716,
  activo: Estado['DESHABILITADO'],
  tipo: TipoRequisito['OBLIGATORIO'],
  nombre: 'payment boliviano',
  descripcion: 'global programming',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithNewData: NewAsignaturaRequisito = {
  activo: Estado['HABILITADO'],
  tipo: TipoRequisito['OBLIGATORIO'],
  nombre: 'state withdrawal',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
