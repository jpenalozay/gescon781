import dayjs from 'dayjs/esm';
import { IDistrit } from 'app/entities/distrit/distrit.model';
import { Paises } from 'app/entities/enumerations/paises.model';
import { Sexo } from 'app/entities/enumerations/sexo.model';
import { EstadoCivilPersona } from 'app/entities/enumerations/estado-civil-persona.model';
import { TipoDocumentoPersona } from 'app/entities/enumerations/tipo-documento-persona.model';

export interface IPersona {
  id?: number;
  nacionalidad?: Paises | null;
  nombres?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string | null;
  fechaNacimiento?: dayjs.Dayjs | null;
  genero?: Sexo | null;
  estadoCivil?: EstadoCivilPersona | null;
  tipoDocumento?: TipoDocumentoPersona;
  numeroDocumento?: string;
  telefonoParticular?: string | null;
  telefonoParticular1?: string | null;
  emailPersonal?: string | null;
  direccion?: string | null;
  distrito?: IDistrit | null;
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public nacionalidad?: Paises | null,
    public nombres?: string,
    public apellidoPaterno?: string,
    public apellidoMaterno?: string | null,
    public fechaNacimiento?: dayjs.Dayjs | null,
    public genero?: Sexo | null,
    public estadoCivil?: EstadoCivilPersona | null,
    public tipoDocumento?: TipoDocumentoPersona,
    public numeroDocumento?: string,
    public telefonoParticular?: string | null,
    public telefonoParticular1?: string | null,
    public emailPersonal?: string | null,
    public direccion?: string | null,
    public distrito?: IDistrit | null
  ) {}
}

export function getPersonaIdentifier(persona: IPersona): number | undefined {
  return persona.id;
}
