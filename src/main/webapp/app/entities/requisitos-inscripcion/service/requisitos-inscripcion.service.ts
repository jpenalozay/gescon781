import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRequisitosInscripcion, getRequisitosInscripcionIdentifier } from '../requisitos-inscripcion.model';

export type EntityResponseType = HttpResponse<IRequisitosInscripcion>;
export type EntityArrayResponseType = HttpResponse<IRequisitosInscripcion[]>;

@Injectable({ providedIn: 'root' })
export class RequisitosInscripcionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/requisitos-inscripcions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(requisitosInscripcion: IRequisitosInscripcion): Observable<EntityResponseType> {
    return this.http.post<IRequisitosInscripcion>(this.resourceUrl, requisitosInscripcion, { observe: 'response' });
  }

  update(requisitosInscripcion: IRequisitosInscripcion): Observable<EntityResponseType> {
    return this.http.put<IRequisitosInscripcion>(
      `${this.resourceUrl}/${getRequisitosInscripcionIdentifier(requisitosInscripcion) as number}`,
      requisitosInscripcion,
      { observe: 'response' }
    );
  }

  partialUpdate(requisitosInscripcion: IRequisitosInscripcion): Observable<EntityResponseType> {
    return this.http.patch<IRequisitosInscripcion>(
      `${this.resourceUrl}/${getRequisitosInscripcionIdentifier(requisitosInscripcion) as number}`,
      requisitosInscripcion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRequisitosInscripcion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRequisitosInscripcion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRequisitosInscripcionToCollectionIfMissing(
    requisitosInscripcionCollection: IRequisitosInscripcion[],
    ...requisitosInscripcionsToCheck: (IRequisitosInscripcion | null | undefined)[]
  ): IRequisitosInscripcion[] {
    const requisitosInscripcions: IRequisitosInscripcion[] = requisitosInscripcionsToCheck.filter(isPresent);
    if (requisitosInscripcions.length > 0) {
      const requisitosInscripcionCollectionIdentifiers = requisitosInscripcionCollection.map(
        requisitosInscripcionItem => getRequisitosInscripcionIdentifier(requisitosInscripcionItem)!
      );
      const requisitosInscripcionsToAdd = requisitosInscripcions.filter(requisitosInscripcionItem => {
        const requisitosInscripcionIdentifier = getRequisitosInscripcionIdentifier(requisitosInscripcionItem);
        if (
          requisitosInscripcionIdentifier == null ||
          requisitosInscripcionCollectionIdentifiers.includes(requisitosInscripcionIdentifier)
        ) {
          return false;
        }
        requisitosInscripcionCollectionIdentifiers.push(requisitosInscripcionIdentifier);
        return true;
      });
      return [...requisitosInscripcionsToAdd, ...requisitosInscripcionCollection];
    }
    return requisitosInscripcionCollection;
  }
}
