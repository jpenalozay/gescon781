import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { IHorario } from 'app/entities/horario/horario.model';
import { IProgramacion } from 'app/entities/programacion/programacion.model';
import { ILicenciaCategoria } from 'app/entities/licencia-categoria/licencia-categoria.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';

export interface IProfesor {
  id?: number;
  activo?: Estado;
  codigo?: string;
  teoria?: SiNo;
  practica?: SiNo;
  licenciaNumero?: string | null;
  empleado?: IEmpleado;
  horarios?: IHorario[] | null;
  programacions?: IProgramacion[] | null;
  licenciasPermitidas?: ILicenciaCategoria[] | null;
  licenciaCategoria?: ILicenciaCategoria | null;
}

export class Profesor implements IProfesor {
  constructor(
    public id?: number,
    public activo?: Estado,
    public codigo?: string,
    public teoria?: SiNo,
    public practica?: SiNo,
    public licenciaNumero?: string | null,
    public empleado?: IEmpleado,
    public horarios?: IHorario[] | null,
    public programacions?: IProgramacion[] | null,
    public licenciasPermitidas?: ILicenciaCategoria[] | null,
    public licenciaCategoria?: ILicenciaCategoria | null
  ) {}
}

export function getProfesorIdentifier(profesor: IProfesor): number | undefined {
  return profesor.id;
}
