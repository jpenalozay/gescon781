import { IUsuario, NewUsuario } from './usuario.model';

export const sampleWithRequiredData: IUsuario = {
  id: 19585,
  codigo: 'cross-',
};

export const sampleWithPartialData: IUsuario = {
  id: 56175,
  codigo: 'Cuenta',
  codigoSecreto: 'Avon S',
};

export const sampleWithFullData: IUsuario = {
  id: 4097,
  codigo: 'a Ofic',
  codigoSecreto: 'Bielor',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithNewData: NewUsuario = {
  codigo: 'Plásti',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
