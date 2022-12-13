import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAsignaturaRequisito, getAsignaturaRequisitoIdentifier } from '../asignatura-requisito.model';

export type EntityResponseType = HttpResponse<IAsignaturaRequisito>;
export type EntityArrayResponseType = HttpResponse<IAsignaturaRequisito[]>;

@Injectable({ providedIn: 'root' })
export class AsignaturaRequisitoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/asignatura-requisitos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(asignaturaRequisito: IAsignaturaRequisito): Observable<EntityResponseType> {
    return this.http.post<IAsignaturaRequisito>(this.resourceUrl, asignaturaRequisito, { observe: 'response' });
  }

  update(asignaturaRequisito: IAsignaturaRequisito): Observable<EntityResponseType> {
    return this.http.put<IAsignaturaRequisito>(
      `${this.resourceUrl}/${getAsignaturaRequisitoIdentifier(asignaturaRequisito) as number}`,
      asignaturaRequisito,
      { observe: 'response' }
    );
  }

  partialUpdate(asignaturaRequisito: IAsignaturaRequisito): Observable<EntityResponseType> {
    return this.http.patch<IAsignaturaRequisito>(
      `${this.resourceUrl}/${getAsignaturaRequisitoIdentifier(asignaturaRequisito) as number}`,
      asignaturaRequisito,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAsignaturaRequisito>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAsignaturaRequisito[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAsignaturaRequisitoToCollectionIfMissing(
    asignaturaRequisitoCollection: IAsignaturaRequisito[],
    ...asignaturaRequisitosToCheck: (IAsignaturaRequisito | null | undefined)[]
  ): IAsignaturaRequisito[] {
    const asignaturaRequisitos: IAsignaturaRequisito[] = asignaturaRequisitosToCheck.filter(isPresent);
    if (asignaturaRequisitos.length > 0) {
      const asignaturaRequisitoCollectionIdentifiers = asignaturaRequisitoCollection.map(
        asignaturaRequisitoItem => getAsignaturaRequisitoIdentifier(asignaturaRequisitoItem)!
      );
      const asignaturaRequisitosToAdd = asignaturaRequisitos.filter(asignaturaRequisitoItem => {
        const asignaturaRequisitoIdentifier = getAsignaturaRequisitoIdentifier(asignaturaRequisitoItem);
        if (asignaturaRequisitoIdentifier == null || asignaturaRequisitoCollectionIdentifiers.includes(asignaturaRequisitoIdentifier)) {
          return false;
        }
        asignaturaRequisitoCollectionIdentifiers.push(asignaturaRequisitoIdentifier);
        return true;
      });
      return [...asignaturaRequisitosToAdd, ...asignaturaRequisitoCollection];
    }
    return asignaturaRequisitoCollection;
  }
}
