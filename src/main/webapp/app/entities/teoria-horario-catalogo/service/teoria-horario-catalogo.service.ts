import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITeoriaHorarioCatalogo, getTeoriaHorarioCatalogoIdentifier } from '../teoria-horario-catalogo.model';

export type EntityResponseType = HttpResponse<ITeoriaHorarioCatalogo>;
export type EntityArrayResponseType = HttpResponse<ITeoriaHorarioCatalogo[]>;

@Injectable({ providedIn: 'root' })
export class TeoriaHorarioCatalogoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/teoria-horario-catalogos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(teoriaHorarioCatalogo: ITeoriaHorarioCatalogo): Observable<EntityResponseType> {
    return this.http.post<ITeoriaHorarioCatalogo>(this.resourceUrl, teoriaHorarioCatalogo, { observe: 'response' });
  }

  update(teoriaHorarioCatalogo: ITeoriaHorarioCatalogo): Observable<EntityResponseType> {
    return this.http.put<ITeoriaHorarioCatalogo>(
      `${this.resourceUrl}/${getTeoriaHorarioCatalogoIdentifier(teoriaHorarioCatalogo) as number}`,
      teoriaHorarioCatalogo,
      { observe: 'response' }
    );
  }

  partialUpdate(teoriaHorarioCatalogo: ITeoriaHorarioCatalogo): Observable<EntityResponseType> {
    return this.http.patch<ITeoriaHorarioCatalogo>(
      `${this.resourceUrl}/${getTeoriaHorarioCatalogoIdentifier(teoriaHorarioCatalogo) as number}`,
      teoriaHorarioCatalogo,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITeoriaHorarioCatalogo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITeoriaHorarioCatalogo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTeoriaHorarioCatalogoToCollectionIfMissing(
    teoriaHorarioCatalogoCollection: ITeoriaHorarioCatalogo[],
    ...teoriaHorarioCatalogosToCheck: (ITeoriaHorarioCatalogo | null | undefined)[]
  ): ITeoriaHorarioCatalogo[] {
    const teoriaHorarioCatalogos: ITeoriaHorarioCatalogo[] = teoriaHorarioCatalogosToCheck.filter(isPresent);
    if (teoriaHorarioCatalogos.length > 0) {
      const teoriaHorarioCatalogoCollectionIdentifiers = teoriaHorarioCatalogoCollection.map(
        teoriaHorarioCatalogoItem => getTeoriaHorarioCatalogoIdentifier(teoriaHorarioCatalogoItem)!
      );
      const teoriaHorarioCatalogosToAdd = teoriaHorarioCatalogos.filter(teoriaHorarioCatalogoItem => {
        const teoriaHorarioCatalogoIdentifier = getTeoriaHorarioCatalogoIdentifier(teoriaHorarioCatalogoItem);
        if (
          teoriaHorarioCatalogoIdentifier == null ||
          teoriaHorarioCatalogoCollectionIdentifiers.includes(teoriaHorarioCatalogoIdentifier)
        ) {
          return false;
        }
        teoriaHorarioCatalogoCollectionIdentifiers.push(teoriaHorarioCatalogoIdentifier);
        return true;
      });
      return [...teoriaHorarioCatalogosToAdd, ...teoriaHorarioCatalogoCollection];
    }
    return teoriaHorarioCatalogoCollection;
  }
}
