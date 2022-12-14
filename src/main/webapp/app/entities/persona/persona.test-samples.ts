import dayjs from 'dayjs/esm';

import { Paises } from 'app/entities/enumerations/paises.model';
import { Sexo } from 'app/entities/enumerations/sexo.model';
import { EstadoCivilPersona } from 'app/entities/enumerations/estado-civil-persona.model';
import { TipoDocumentoPersona } from 'app/entities/enumerations/tipo-documento-persona.model';

import { IPersona, NewPersona } from './persona.model';

export const sampleWithRequiredData: IPersona = {
  id: 56801,
  nombres: 'Borders compress Guapa',
  apellidoPaterno: 'quantifying',
  tipoDocumento: TipoDocumentoPersona['DOCUMENTO_DE_EXTRANJERIA'],
  numeroDocumento: 'deposit mobile ',
};

export const sampleWithPartialData: IPersona = {
  id: 94017,
  nacionalidad: Paises['PERU'],
  nombres: 'Bricolaje',
  apellidoPaterno: 'Account Comunicaciones Toallas',
  tipoDocumento: TipoDocumentoPersona['DOCUMENTO_DE_EXTRANJERIA'],
  numeroDocumento: 'solid',
  telefonoParticular: 'e-tailers Usabilidad',
  emailPersonal: 'Franc Investment granular',
  direccion: 'architect primary',
};

export const sampleWithFullData: IPersona = {
  id: 37083,
  nacionalidad: Paises['VENEZUELA'],
  nombres: 'primary',
  apellidoPaterno: 'Italia Toallas',
  apellidoMaterno: 'input Producto Metal',
  fechaNacimiento: dayjs('2022-11-23'),
  genero: Sexo['VARON'],
  estadoCivil: EstadoCivilPersona['SOLTERO'],
  tipoDocumento: TipoDocumentoPersona['DNI'],
  numeroDocumento: 'Director sinerg',
  telefonoParticular: 'online',
  telefonoParticular1: 'recontextualize Nige',
  emailPersonal: 'interface Gorro La',
  direccion: 'defectos connecting Investment',
};

export const sampleWithNewData: NewPersona = {
  nombres: 'open-source',
  apellidoPaterno: 'B2B Urbanización',
  tipoDocumento: TipoDocumentoPersona['CEDULA'],
  numeroDocumento: 'Cliente (E.M.U.',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
