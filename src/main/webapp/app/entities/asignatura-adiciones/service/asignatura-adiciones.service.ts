import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAsignaturaAdiciones, getAsignaturaAdicionesIdentifier } from '../asignatura-adiciones.model';

export type EntityResponseType = HttpResponse<IAsignaturaAdiciones>;
export type EntityArrayResponseType = HttpResponse<IAsignaturaAdiciones[]>;

@Injectable({ providedIn: 'root' })
export class AsignaturaAdicionesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/asignatura-adiciones');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(asignaturaAdiciones: IAsignaturaAdiciones): Observable<EntityResponseType> {
    return this.http.post<IAsignaturaAdiciones>(this.resourceUrl, asignaturaAdiciones, { observe: 'response' });
  }

  update(asignaturaAdiciones: IAsignaturaAdiciones): Observable<EntityResponseType> {
    return this.http.put<IAsignaturaAdiciones>(
      `${this.resourceUrl}/${getAsignaturaAdicionesIdentifier(asignaturaAdiciones) as number}`,
      asignaturaAdiciones,
      { observe: 'response' }
    );
  }

  partialUpdate(asignaturaAdiciones: IAsignaturaAdiciones): Observable<EntityResponseType> {
    return this.http.patch<IAsignaturaAdiciones>(
      `${this.resourceUrl}/${getAsignaturaAdicionesIdentifier(asignaturaAdiciones) as number}`,
      asignaturaAdiciones,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAsignaturaAdiciones>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAsignaturaAdiciones[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAsignaturaAdicionesToCollectionIfMissing(
    asignaturaAdicionesCollection: IAsignaturaAdiciones[],
    ...asignaturaAdicionesToCheck: (IAsignaturaAdiciones | null | undefined)[]
  ): IAsignaturaAdiciones[] {
    const asignaturaAdiciones: IAsignaturaAdiciones[] = asignaturaAdicionesToCheck.filter(isPresent);
    if (asignaturaAdiciones.length > 0) {
      const asignaturaAdicionesCollectionIdentifiers = asignaturaAdicionesCollection.map(
        asignaturaAdicionesItem => getAsignaturaAdicionesIdentifier(asignaturaAdicionesItem)!
      );
      const asignaturaAdicionesToAdd = asignaturaAdiciones.filter(asignaturaAdicionesItem => {
        const asignaturaAdicionesIdentifier = getAsignaturaAdicionesIdentifier(asignaturaAdicionesItem);
        if (asignaturaAdicionesIdentifier == null || asignaturaAdicionesCollectionIdentifiers.includes(asignaturaAdicionesIdentifier)) {
          return false;
        }
        asignaturaAdicionesCollectionIdentifiers.push(asignaturaAdicionesIdentifier);
        return true;
      });
      return [...asignaturaAdicionesToAdd, ...asignaturaAdicionesCollection];
    }
    return asignaturaAdicionesCollection;
  }
}
