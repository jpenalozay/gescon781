import { IAlumnoClases, NewAlumnoClases } from './alumno-clases.model';

export const sampleWithRequiredData: IAlumnoClases = {
  id: 50599,
};

export const sampleWithPartialData: IAlumnoClases = {
  id: 89137,
};

export const sampleWithFullData: IAlumnoClases = {
  id: 19381,
  clasesTotales: 40454,
  clasesProgramadas: 41221,
  clasesRealizadas: 99739,
};

export const sampleWithNewData: NewAlumnoClases = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
