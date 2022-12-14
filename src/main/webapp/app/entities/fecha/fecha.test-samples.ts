import dayjs from 'dayjs/esm';

import { SiNo } from 'app/entities/enumerations/si-no.model';

import { IFecha, NewFecha } from './fecha.model';

export const sampleWithRequiredData: IFecha = {
  id: 79444,
  fecha: dayjs('2022-11-23'),
  dia: 75231,
  mes: 9959,
  anio: 61158,
  diaNombre: 'hacking',
  diaNombreCorto: 'Madera f',
};

export const sampleWithPartialData: IFecha = {
  id: 78555,
  fecha: dayjs('2022-11-24'),
  dia: 63040,
  mes: 47540,
  anio: 53928,
  diaNombre: 'Irak iterate',
  diaNombreCorto: 'SCSI a T',
  feriado: SiNo['NO'],
  laboral: SiNo['NO'],
};

export const sampleWithFullData: IFecha = {
  id: 55450,
  fecha: dayjs(undefined),
  dia: 52027,
  mes: 98369,
  anio: 25234,
  diaNombre: 'disintermediate',
  diaNombreCorto: 'primary ',
  feriado: SiNo['SI'],
  laboral: SiNo['NO'],
  finSemana: SiNo['SI'],
};

export const sampleWithNewData: NewFecha = {
  fecha: dayjs(undefined),
  dia: 85652,
  mes: 82754,
  anio: 90012,
  diaNombre: 'Morado',
  diaNombreCorto: 'Extremad',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
