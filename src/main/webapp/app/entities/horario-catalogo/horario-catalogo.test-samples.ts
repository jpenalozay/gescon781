import { Estado } from 'app/entities/enumerations/estado.model';

import { IHorarioCatalogo, NewHorarioCatalogo } from './horario-catalogo.model';

export const sampleWithRequiredData: IHorarioCatalogo = {
  id: 90118,
  activo: Estado['DESHABILITADO'],
  codigo: 24,
  horaInicio: 'transmit',
  horaFin: 'drive',
  descripcion: 'digital models A',
};

export const sampleWithPartialData: IHorarioCatalogo = {
  id: 21650,
  activo: Estado['HABILITADO'],
  codigo: 66,
  horaInicio: 'wireless',
  horaFin: 'calculat',
  descripcion: 'a Ladrillo Pasaj',
};

export const sampleWithFullData: IHorarioCatalogo = {
  id: 81927,
  activo: Estado['HABILITADO'],
  codigo: 65,
  horaInicio: 'Gorro',
  horaFin: 'Deportes',
  descripcion: 'Global Artesanal',
};

export const sampleWithNewData: NewHorarioCatalogo = {
  activo: Estado['DESHABILITADO'],
  codigo: 12,
  horaInicio: 'Dominica',
  horaFin: 'Gris EXE',
  descripcion: 'holistic usuario',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
