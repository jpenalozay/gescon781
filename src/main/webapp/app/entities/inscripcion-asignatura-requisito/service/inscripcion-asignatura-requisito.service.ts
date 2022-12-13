import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInscripcionAsignaturaRequisito, getInscripcionAsignaturaRequisitoIdentifier } from '../inscripcion-asignatura-requisito.model';

export type EntityResponseType = HttpResponse<IInscripcionAsignaturaRequisito>;
export type EntityArrayResponseType = HttpResponse<IInscripcionAsignaturaRequisito[]>;

@Injectable({ providedIn: 'root' })
export class InscripcionAsignaturaRequisitoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/inscripcion-asignatura-requisitos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito): Observable<EntityResponseType> {
    return this.http.post<IInscripcionAsignaturaRequisito>(this.resourceUrl, inscripcionAsignaturaRequisito, { observe: 'response' });
  }

  update(inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito): Observable<EntityResponseType> {
    return this.http.put<IInscripcionAsignaturaRequisito>(
      `${this.resourceUrl}/${getInscripcionAsignaturaRequisitoIdentifier(inscripcionAsignaturaRequisito) as number}`,
      inscripcionAsignaturaRequisito,
      { observe: 'response' }
    );
  }

  partialUpdate(inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito): Observable<EntityResponseType> {
    return this.http.patch<IInscripcionAsignaturaRequisito>(
      `${this.resourceUrl}/${getInscripcionAsignaturaRequisitoIdentifier(inscripcionAsignaturaRequisito) as number}`,
      inscripcionAsignaturaRequisito,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInscripcionAsignaturaRequisito>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInscripcionAsignaturaRequisito[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInscripcionAsignaturaRequisitoToCollectionIfMissing(
    inscripcionAsignaturaRequisitoCollection: IInscripcionAsignaturaRequisito[],
    ...inscripcionAsignaturaRequisitosToCheck: (IInscripcionAsignaturaRequisito | null | undefined)[]
  ): IInscripcionAsignaturaRequisito[] {
    const inscripcionAsignaturaRequisitos: IInscripcionAsignaturaRequisito[] = inscripcionAsignaturaRequisitosToCheck.filter(isPresent);
    if (inscripcionAsignaturaRequisitos.length > 0) {
      const inscripcionAsignaturaRequisitoCollectionIdentifiers = inscripcionAsignaturaRequisitoCollection.map(
        inscripcionAsignaturaRequisitoItem => getInscripcionAsignaturaRequisitoIdentifier(inscripcionAsignaturaRequisitoItem)!
      );
      const inscripcionAsignaturaRequisitosToAdd = inscripcionAsignaturaRequisitos.filter(inscripcionAsignaturaRequisitoItem => {
        const inscripcionAsignaturaRequisitoIdentifier = getInscripcionAsignaturaRequisitoIdentifier(inscripcionAsignaturaRequisitoItem);
        if (
          inscripcionAsignaturaRequisitoIdentifier == null ||
          inscripcionAsignaturaRequisitoCollectionIdentifiers.includes(inscripcionAsignaturaRequisitoIdentifier)
        ) {
          return false;
        }
        inscripcionAsignaturaRequisitoCollectionIdentifiers.push(inscripcionAsignaturaRequisitoIdentifier);
        return true;
      });
      return [...inscripcionAsignaturaRequisitosToAdd, ...inscripcionAsignaturaRequisitoCollection];
    }
    return inscripcionAsignaturaRequisitoCollection;
  }
}
