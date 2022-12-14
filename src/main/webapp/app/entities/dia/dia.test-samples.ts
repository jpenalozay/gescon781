import { IDia, NewDia } from './dia.model';

export const sampleWithRequiredData: IDia = {
  id: 82221,
  nombre: 'Bacon estatica C',
  nombreCorto: 'Guante',
};

export const sampleWithPartialData: IDia = {
  id: 88124,
  nombre: 'Barranco',
  nombreCorto: 'Accoun',
};

export const sampleWithFullData: IDia = {
  id: 98956,
  nombre: 'partnerships Ber',
  nombreCorto: 'leadin',
};

export const sampleWithNewData: NewDia = {
  nombre: 'Pelota',
  nombreCorto: 'Kwacha',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
