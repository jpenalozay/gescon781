import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoUnidadOrganizativa } from 'app/entities/enumerations/tipo-unidad-organizativa.model';

import { IArea, NewArea } from './area.model';

export const sampleWithRequiredData: IArea = {
  id: 11565,
  activo: Estado['HABILITADO'],
  codigo: 'Marr',
  tipo: TipoUnidadOrganizativa['JUNTA'],
  nombre: 'compelling Coordinador',
  nombreCorto: 'back-end Increible Sorprendente',
};

export const sampleWithPartialData: IArea = {
  id: 71188,
  activo: Estado['DESHABILITADO'],
  codigo: 'comp',
  tipo: TipoUnidadOrganizativa['AREA'],
  nombre: 'Práctico Checking',
  nombreCorto: 'proporciona plug-and-play',
};

export const sampleWithFullData: IArea = {
  id: 93009,
  activo: Estado['HABILITADO'],
  codigo: 'Avon',
  tipo: TipoUnidadOrganizativa['JUNTA'],
  nombre: 'B2B index Creativo',
  nombreCorto: 'Expandido',
};

export const sampleWithNewData: NewArea = {
  activo: Estado['DESHABILITADO'],
  codigo: 'harn',
  tipo: TipoUnidadOrganizativa['OFICINA'],
  nombre: 'mobile Qatari Ordenador',
  nombreCorto: 'granular Librería Atún',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
