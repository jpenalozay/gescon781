import dayjs from 'dayjs/esm';

import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoDocumentoVenta } from 'app/entities/enumerations/tipo-documento-venta.model';

import { ISucursalSerie, NewSucursalSerie } from './sucursal-serie.model';

export const sampleWithRequiredData: ISucursalSerie = {
  id: 38083,
  activo: Estado['HABILITADO'],
  tipoDocumento: TipoDocumentoVenta['BOLETA'],
  serie: 'innovado',
  numeroUltimo: 42633,
};

export const sampleWithPartialData: ISucursalSerie = {
  id: 49725,
  activo: Estado['DESHABILITADO'],
  tipoDocumento: TipoDocumentoVenta['NOTA_DE_VENTA'],
  serie: 'Hormigon',
  fechaEmision: dayjs('2022-11-23'),
  numeroMaximo: 10210,
  numeroUltimo: 66517,
};

export const sampleWithFullData: ISucursalSerie = {
  id: 8520,
  activo: Estado['HABILITADO'],
  tipoDocumento: TipoDocumentoVenta['GUIA_REMISION'],
  serie: 'Increibl',
  fechaEmision: dayjs('2022-11-23'),
  numeroMaximo: 21201,
  numeroUltimo: 34737,
};

export const sampleWithNewData: NewSucursalSerie = {
  activo: Estado['DESHABILITADO'],
  tipoDocumento: TipoDocumentoVenta['PROFORMA'],
  serie: 'Account ',
  numeroUltimo: 21104,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
