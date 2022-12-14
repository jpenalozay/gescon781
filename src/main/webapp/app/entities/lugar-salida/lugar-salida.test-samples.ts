import { ILugarSalida, NewLugarSalida } from './lugar-salida.model';

export const sampleWithRequiredData: ILugarSalida = {
  id: 54966,
};

export const sampleWithPartialData: ILugarSalida = {
  id: 25142,
  nombre: 'Galicia quantifying Director',
};

export const sampleWithFullData: ILugarSalida = {
  id: 66101,
  nombre: 'de Ingeniero',
};

export const sampleWithNewData: NewLugarSalida = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
