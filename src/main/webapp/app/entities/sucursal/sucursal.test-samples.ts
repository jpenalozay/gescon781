import dayjs from 'dayjs/esm';

import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';

import { ISucursal, NewSucursal } from './sucursal.model';

export const sampleWithRequiredData: ISucursal = {
  id: 69706,
  activo: Estado['DESHABILITADO'],
  codigo: 'Rin',
  central: SiNo['SI'],
  nombre: 'Loan',
  nombreCorto: 'León',
  nombreAbreviado: 'Loan Ladrillo',
  direccion: 'Consultor la',
};

export const sampleWithPartialData: ISucursal = {
  id: 77756,
  activo: Estado['DESHABILITADO'],
  codigo: 'Age',
  central: SiNo['SI'],
  nombre: 'networks Sabroso Regional',
  nombreCorto: 'quantifying Ensalada Galicia',
  nombreAbreviado: 'mobile Hogar',
  telefono1: 'one-to-one',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
  direccion: 'Seychelles Inversor',
};

export const sampleWithFullData: ISucursal = {
  id: 71273,
  activo: Estado['DESHABILITADO'],
  codigo: 'inp',
  central: SiNo['SI'],
  nombre: 'cross-platform',
  nombreCorto: 'bandwidth SCSI Avon',
  nombreAbreviado: 'Perú utilize',
  fechaInicio: dayjs('2022-11-23'),
  telefono: 'cohesiva optimi',
  telefono1: 'Práctico',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
  direccion: 'payment',
};

export const sampleWithNewData: NewSucursal = {
  activo: Estado['HABILITADO'],
  codigo: 'Loa',
  central: SiNo['SI'],
  nombre: 'estructura',
  nombreCorto: 'iterate real SQL',
  nombreAbreviado: 'clicks-and-morta',
  direccion: 'Multi Verde',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
