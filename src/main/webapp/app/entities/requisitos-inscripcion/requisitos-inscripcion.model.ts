import { IInscripcionAdicional } from 'app/entities/inscripcion-adicional/inscripcion-adicional.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';
import { RequitisoTipo } from 'app/entities/enumerations/requitiso-tipo.model';

export interface IRequisitosInscripcion {
  id?: number;
  activo?: Estado;
  obligatorio?: SiNo;
  nombre?: string;
  nombreCorto?: string;
  costo?: number | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  tipoRequisito?: RequitisoTipo | null;
  valores?: string | null;
  inscripcionAdicionals?: IInscripcionAdicional[] | null;
}

export class RequisitosInscripcion implements IRequisitosInscripcion {
  constructor(
    public id?: number,
    public activo?: Estado,
    public obligatorio?: SiNo,
    public nombre?: string,
    public nombreCorto?: string,
    public costo?: number | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public tipoRequisito?: RequitisoTipo | null,
    public valores?: string | null,
    public inscripcionAdicionals?: IInscripcionAdicional[] | null
  ) {}
}

export function getRequisitosInscripcionIdentifier(requisitosInscripcion: IRequisitosInscripcion): number | undefined {
  return requisitosInscripcion.id;
}
