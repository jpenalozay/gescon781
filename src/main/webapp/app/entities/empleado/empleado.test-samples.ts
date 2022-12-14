import dayjs from 'dayjs/esm';

import { EstadoEmpleado } from 'app/entities/enumerations/estado-empleado.model';
import { EmpleadoTipo } from 'app/entities/enumerations/empleado-tipo.model';
import { GradoInstruccion } from 'app/entities/enumerations/grado-instruccion.model';

import { IEmpleado, NewEmpleado } from './empleado.model';

export const sampleWithRequiredData: IEmpleado = {
  id: 19124,
  estado: EstadoEmpleado['ACTIVO'],
  tipo: EmpleadoTipo['OTRO'],
  codigo: 'Suiza ',
  fechaIngreso: dayjs('2022-11-23'),
};

export const sampleWithPartialData: IEmpleado = {
  id: 72552,
  estado: EstadoEmpleado['VACACIONES'],
  tipo: EmpleadoTipo['OTRO'],
  codigo: 'Total ',
  codigoAcceso: 'Super',
  telefonoTrabajo: 'Amarillo Práctico',
  fechaIngreso: dayjs('2022-11-23'),
  sueldo: 59739,
  firma: '../fake-data/blob/hipster.png',
  firmaContentType: 'unknown',
};

export const sampleWithFullData: IEmpleado = {
  id: 51834,
  estado: EstadoEmpleado['CESADO'],
  tipo: EmpleadoTipo['OTRO'],
  codigo: 'Money ',
  codigoAcceso: 'cutti',
  telefonoTrabajo: 'maximize Moroccan',
  telefonoTrabajo1: 'Islands Solar',
  gradoInstrucion: GradoInstruccion['OTRO'],
  emailCoorporativo: 'AGP program a',
  fechaIngreso: dayjs('2022-11-23'),
  inasistencias: 7,
  tardanzas: 33,
  imagen: '../fake-data/blob/hipster.png',
  imagenContentType: 'unknown',
  sueldo: 57329,
  firma: '../fake-data/blob/hipster.png',
  firmaContentType: 'unknown',
};

export const sampleWithNewData: NewEmpleado = {
  estado: EstadoEmpleado['FIN_DE_CONTRARO'],
  tipo: EmpleadoTipo['OTRO'],
  codigo: 'Market',
  fechaIngreso: dayjs('2022-11-23'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
