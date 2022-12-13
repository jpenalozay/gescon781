import { IPersona } from 'app/entities/persona/persona.model';
import { IAlumnoClases } from 'app/entities/alumno-clases/alumno-clases.model';
import { IAlumnoUsuario } from 'app/entities/alumno-usuario/alumno-usuario.model';
import { IAlumnoCategoria } from 'app/entities/alumno-categoria/alumno-categoria.model';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { IHorario } from 'app/entities/horario/horario.model';
import { AlumnoEstado } from 'app/entities/enumerations/alumno-estado.model';
import { AlumnoTipo } from 'app/entities/enumerations/alumno-tipo.model';
import { GradoInstruccion } from 'app/entities/enumerations/grado-instruccion.model';
import { Ocupacion } from 'app/entities/enumerations/ocupacion.model';

export interface IAlumno {
  id?: number;
  codigo?: string;
  estado?: AlumnoEstado;
  tipo?: AlumnoTipo;
  alumnoGradoInstruccion?: GradoInstruccion | null;
  ocupacion?: Ocupacion | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  persona?: IPersona;
  alumnoClases?: IAlumnoClases | null;
  alumnoUsuarios?: IAlumnoUsuario[] | null;
  alumnoCategorias?: IAlumnoCategoria[] | null;
  inscripcions?: IInscripcion[] | null;
  horarios?: IHorario[] | null;
}

export class Alumno implements IAlumno {
  constructor(
    public id?: number,
    public codigo?: string,
    public estado?: AlumnoEstado,
    public tipo?: AlumnoTipo,
    public alumnoGradoInstruccion?: GradoInstruccion | null,
    public ocupacion?: Ocupacion | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public persona?: IPersona,
    public alumnoClases?: IAlumnoClases | null,
    public alumnoUsuarios?: IAlumnoUsuario[] | null,
    public alumnoCategorias?: IAlumnoCategoria[] | null,
    public inscripcions?: IInscripcion[] | null,
    public horarios?: IHorario[] | null
  ) {}
}

export function getAlumnoIdentifier(alumno: IAlumno): number | undefined {
  return alumno.id;
}
