import { IAlumnoCategoria, NewAlumnoCategoria } from './alumno-categoria.model';

export const sampleWithRequiredData: IAlumnoCategoria = {
  id: 71619,
  licenciaNumeroAlumno: 'overriding Zapat',
};

export const sampleWithPartialData: IAlumnoCategoria = {
  id: 7205,
  licenciaNumeroAlumno: 'Cliente Papelerí',
};

export const sampleWithFullData: IAlumnoCategoria = {
  id: 32140,
  licenciaNumeroAlumno: 'parse',
};

export const sampleWithNewData: NewAlumnoCategoria = {
  licenciaNumeroAlumno: 'Facilitador',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
