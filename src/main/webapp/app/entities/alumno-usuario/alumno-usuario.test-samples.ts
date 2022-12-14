import { Estado } from 'app/entities/enumerations/estado.model';

import { IAlumnoUsuario, NewAlumnoUsuario } from './alumno-usuario.model';

export const sampleWithRequiredData: IAlumnoUsuario = {
  id: 20897,
  usuario: 'Granito',
  clave: 'Personal',
};

export const sampleWithPartialData: IAlumnoUsuario = {
  id: 42459,
  usuario: 'busX',
  clave: 'SMTP wireless',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithFullData: IAlumnoUsuario = {
  id: 88811,
  activo: Estado['HABILITADO'],
  usuario: 'Producto bifurcada Account',
  clave: 'Nauru',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithNewData: NewAlumnoUsuario = {
  usuario: 'Videojuegos Algodón',
  clave: 'content',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
