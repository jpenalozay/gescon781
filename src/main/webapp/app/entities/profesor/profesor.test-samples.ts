import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';

import { IProfesor, NewProfesor } from './profesor.model';

export const sampleWithRequiredData: IProfesor = {
  id: 26871,
  activo: Estado['DESHABILITADO'],
  codigo: 'Bolivi',
  teoria: SiNo['NO'],
  practica: SiNo['NO'],
};

export const sampleWithPartialData: IProfesor = {
  id: 14409,
  activo: Estado['HABILITADO'],
  codigo: 'Prácti',
  teoria: SiNo['SI'],
  practica: SiNo['NO'],
  licenciaNumero: 'Extrarradio Actu',
};

export const sampleWithFullData: IProfesor = {
  id: 3301,
  activo: Estado['DESHABILITADO'],
  codigo: 'withdr',
  teoria: SiNo['SI'],
  practica: SiNo['NO'],
  licenciaNumero: 'Navarra Rojo Cam',
};

export const sampleWithNewData: NewProfesor = {
  activo: Estado['HABILITADO'],
  codigo: 'Gorro ',
  teoria: SiNo['SI'],
  practica: SiNo['SI'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
