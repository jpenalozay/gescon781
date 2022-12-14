import { Estado } from 'app/entities/enumerations/estado.model';

import { ITeoriaHorarioCatalogo, NewTeoriaHorarioCatalogo } from './teoria-horario-catalogo.model';

export const sampleWithRequiredData: ITeoriaHorarioCatalogo = {
  id: 10127,
  activo: Estado['DESHABILITADO'],
  nombre: 'Marruecos',
  nombreCorto: 'Berkshire Quinta Mejorado',
};

export const sampleWithPartialData: ITeoriaHorarioCatalogo = {
  id: 14335,
  activo: Estado['HABILITADO'],
  nombre: 'neutral experiences',
  nombreCorto: 'deliver',
  descripcion: 'bluetooth',
  horaInicio: 32357,
  horaFin: 31571,
};

export const sampleWithFullData: ITeoriaHorarioCatalogo = {
  id: 83017,
  activo: Estado['DESHABILITADO'],
  nombre: 'compressing',
  nombreCorto: 'Mancha',
  descripcion: 'program',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
  periodo: 'e-commerce ROI Guantes',
  anio: 'Comunidad up',
  mes: 'deposit Gris',
  dia: 'matrix Queso Algodón',
  horaInicio: 74233,
  horaFin: 70602,
};

export const sampleWithNewData: NewTeoriaHorarioCatalogo = {
  activo: Estado['HABILITADO'],
  nombre: '1080p Card Interno',
  nombreCorto: 'paralelismo',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
