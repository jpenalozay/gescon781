import dayjs from 'dayjs/esm';
import { IPersona } from 'app/entities/persona/persona.model';
import { ICargo } from 'app/entities/cargo/cargo.model';
import { EstadoEmpleado } from 'app/entities/enumerations/estado-empleado.model';
import { EmpleadoTipo } from 'app/entities/enumerations/empleado-tipo.model';
import { GradoInstruccion } from 'app/entities/enumerations/grado-instruccion.model';

export interface IEmpleado {
  id?: number;
  estado?: EstadoEmpleado;
  tipo?: EmpleadoTipo;
  codigo?: string;
  codigoAcceso?: string | null;
  telefonoTrabajo?: string | null;
  telefonoTrabajo1?: string | null;
  gradoInstrucion?: GradoInstruccion | null;
  emailCoorporativo?: string | null;
  fechaIngreso?: dayjs.Dayjs;
  inasistencias?: number | null;
  tardanzas?: number | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  sueldo?: number | null;
  firmaContentType?: string | null;
  firma?: string | null;
  persona?: IPersona;
  cargo?: ICargo;
}

export class Empleado implements IEmpleado {
  constructor(
    public id?: number,
    public estado?: EstadoEmpleado,
    public tipo?: EmpleadoTipo,
    public codigo?: string,
    public codigoAcceso?: string | null,
    public telefonoTrabajo?: string | null,
    public telefonoTrabajo1?: string | null,
    public gradoInstrucion?: GradoInstruccion | null,
    public emailCoorporativo?: string | null,
    public fechaIngreso?: dayjs.Dayjs,
    public inasistencias?: number | null,
    public tardanzas?: number | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public sueldo?: number | null,
    public firmaContentType?: string | null,
    public firma?: string | null,
    public persona?: IPersona,
    public cargo?: ICargo
  ) {}
}

export function getEmpleadoIdentifier(empleado: IEmpleado): number | undefined {
  return empleado.id;
}
