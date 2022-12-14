import { AlumnoDesarrolloEstado } from 'app/entities/enumerations/alumno-desarrollo-estado.model';

import { IAlumnoDesarrollo, NewAlumnoDesarrollo } from './alumno-desarrollo.model';

export const sampleWithRequiredData: IAlumnoDesarrollo = {
  id: 59996,
};

export const sampleWithPartialData: IAlumnoDesarrollo = {
  id: 8629,
  clasesTeoriaProgramadas: 65,
  clasesRealizadasPractica: 58,
};

export const sampleWithFullData: IAlumnoDesarrollo = {
  id: 89439,
  clasesTeoriaProgramadas: 20,
  clasesPracticasProgramas: 27,
  clasesInasistenciaTeoria: 74,
  clasesInasistenciaPractica: 99,
  clasesRealizadasTeoria: 64,
  clasesRealizadasPractica: 47,
  alumnoDesarrolloEstado: AlumnoDesarrolloEstado['FINALIZO'],
};

export const sampleWithNewData: NewAlumnoDesarrollo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
