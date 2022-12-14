import { AlumnoEstado } from 'app/entities/enumerations/alumno-estado.model';
import { AlumnoTipo } from 'app/entities/enumerations/alumno-tipo.model';
import { GradoInstruccion } from 'app/entities/enumerations/grado-instruccion.model';
import { Ocupacion } from 'app/entities/enumerations/ocupacion.model';

import { IAlumno, NewAlumno } from './alumno.model';

export const sampleWithRequiredData: IAlumno = {
  id: 48853,
  codigo: 'Asisten',
  estado: AlumnoEstado['INSCRITO'],
  tipo: AlumnoTipo['REGULAR'],
};

export const sampleWithPartialData: IAlumno = {
  id: 4694,
  codigo: 'de Sill',
  estado: AlumnoEstado['INSCRITO'],
  tipo: AlumnoTipo['REGULAR'],
};

export const sampleWithFullData: IAlumno = {
  id: 40516,
  codigo: 'SCSIXXX',
  estado: AlumnoEstado['DESERTO'],
  tipo: AlumnoTipo['EXCEPCIONAL'],
  alumnoGradoInstruccion: GradoInstruccion['POSTGRADO'],
  ocupacion: Ocupacion['DEPENDIENTE'],
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
};

export const sampleWithNewData: NewAlumno = {
  codigo: 'Ensalad',
  estado: AlumnoEstado['INSCRITO'],
  tipo: AlumnoTipo['REGULAR'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
