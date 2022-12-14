import { IInscripcionAsignaturaRequisito, NewInscripcionAsignaturaRequisito } from './inscripcion-asignatura-requisito.model';

export const sampleWithRequiredData: IInscripcionAsignaturaRequisito = {
  id: 66145,
};

export const sampleWithPartialData: IInscripcionAsignaturaRequisito = {
  id: 38471,
  documento: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IInscripcionAsignaturaRequisito = {
  id: 79918,
  descripcion: 'Web recíproca',
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
  documento: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewInscripcionAsignaturaRequisito = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
