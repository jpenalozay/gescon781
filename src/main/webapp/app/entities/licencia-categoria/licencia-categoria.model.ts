import { IAlumnoCategoria } from 'app/entities/alumno-categoria/alumno-categoria.model';
import { IProfesor } from 'app/entities/profesor/profesor.model';
import { IAsignatura } from 'app/entities/asignatura/asignatura.model';

export interface ILicenciaCategoria {
  id?: number;
  categoria?: string;
  alumnoCategorias?: IAlumnoCategoria[] | null;
  profesors?: IProfesor[] | null;
  asignaturas?: IAsignatura[] | null;
  intructores?: IProfesor[] | null;
}

export class LicenciaCategoria implements ILicenciaCategoria {
  constructor(
    public id?: number,
    public categoria?: string,
    public alumnoCategorias?: IAlumnoCategoria[] | null,
    public profesors?: IProfesor[] | null,
    public asignaturas?: IAsignatura[] | null,
    public intructores?: IProfesor[] | null
  ) {}
}

export function getLicenciaCategoriaIdentifier(licenciaCategoria: ILicenciaCategoria): number | undefined {
  return licenciaCategoria.id;
}
