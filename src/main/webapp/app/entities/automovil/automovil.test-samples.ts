import dayjs from 'dayjs/esm';

import { Estado } from 'app/entities/enumerations/estado.model';
import { AutomovilTipo } from 'app/entities/enumerations/automovil-tipo.model';
import { AutomovilCaja } from 'app/entities/enumerations/automovil-caja.model';

import { IAutomovil, NewAutomovil } from './automovil.model';

export const sampleWithRequiredData: IAutomovil = {
  id: 16318,
  activo: Estado['HABILITADO'],
  codigo: 'Ergonó',
  tipo: AutomovilTipo['SEDAM'],
  placa: 'navigating Guantes mobile',
};

export const sampleWithPartialData: IAutomovil = {
  id: 96159,
  activo: Estado['DESHABILITADO'],
  codigo: 'eyebal',
  tipo: AutomovilTipo['SEDAM'],
  placa: 'en parsing',
  anio: 'Made',
  soatVencimiento: dayjs('2022-11-23T12:16'),
  caja: AutomovilCaja['AUTOMATICO'],
};

export const sampleWithFullData: IAutomovil = {
  id: 24695,
  activo: Estado['DESHABILITADO'],
  codigo: 'global',
  nombre: 'Regional pixel',
  tipo: AutomovilTipo['HATCHBACK'],
  placa: 'Asociado',
  marca: 'programming Navidad Aplicaciones',
  modelo: 'segura calculating',
  anio: 'virt',
  soatVencimiento: dayjs('2022-11-23T16:46'),
  revisionTecnicaVencimiento: dayjs('2022-11-23T09:49'),
  caja: AutomovilCaja['AUTOMATICO'],
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithNewData: NewAutomovil = {
  activo: Estado['HABILITADO'],
  codigo: 'Joyerí',
  tipo: AutomovilTipo['SEDAM'],
  placa: 'Ingeniero',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
