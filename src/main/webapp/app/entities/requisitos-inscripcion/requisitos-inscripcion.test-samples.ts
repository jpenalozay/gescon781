import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';
import { RequitisoTipo } from 'app/entities/enumerations/requitiso-tipo.model';

import { IRequisitosInscripcion, NewRequisitosInscripcion } from './requisitos-inscripcion.model';

export const sampleWithRequiredData: IRequisitosInscripcion = {
  id: 9370,
  activo: Estado['HABILITADO'],
  obligatorio: SiNo['SI'],
  nombre: 'seize Grupo Dollar',
  nombreCorto: 'compress FTP Gris',
};

export const sampleWithPartialData: IRequisitosInscripcion = {
  id: 98118,
  activo: Estado['HABILITADO'],
  obligatorio: SiNo['SI'],
  nombre: 'Senior mesh Consultor',
  nombreCorto: 'Rojo',
};

export const sampleWithFullData: IRequisitosInscripcion = {
  id: 2324,
  activo: Estado['DESHABILITADO'],
  obligatorio: SiNo['SI'],
  nombre: 'withdrawal generate León',
  nombreCorto: 'Salvador',
  costo: 88360,
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
  tipoRequisito: RequitisoTipo['SELECTIVO'],
  valores: 'asíncrona UIC-Franc iterate',
};

export const sampleWithNewData: NewRequisitosInscripcion = {
  activo: Estado['DESHABILITADO'],
  obligatorio: SiNo['NO'],
  nombre: 'Ramal',
  nombreCorto: 'payment Principado intuitive',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
