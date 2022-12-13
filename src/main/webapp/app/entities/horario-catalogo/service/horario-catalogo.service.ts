import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHorarioCatalogo, getHorarioCatalogoIdentifier } from '../horario-catalogo.model';

export type EntityResponseType = HttpResponse<IHorarioCatalogo>;
export type EntityArrayResponseType = HttpResponse<IHorarioCatalogo[]>;

@Injectable({ providedIn: 'root' })
export class HorarioCatalogoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/horario-catalogos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(horarioCatalogo: IHorarioCatalogo): Observable<EntityResponseType> {
    return this.http.post<IHorarioCatalogo>(this.resourceUrl, horarioCatalogo, { observe: 'response' });
  }

  update(horarioCatalogo: IHorarioCatalogo): Observable<EntityResponseType> {
    return this.http.put<IHorarioCatalogo>(
      `${this.resourceUrl}/${getHorarioCatalogoIdentifier(horarioCatalogo) as number}`,
      horarioCatalogo,
      { observe: 'response' }
    );
  }

  partialUpdate(horarioCatalogo: IHorarioCatalogo): Observable<EntityResponseType> {
    return this.http.patch<IHorarioCatalogo>(
      `${this.resourceUrl}/${getHorarioCatalogoIdentifier(horarioCatalogo) as number}`,
      horarioCatalogo,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHorarioCatalogo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHorarioCatalogo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHorarioCatalogoToCollectionIfMissing(
    horarioCatalogoCollection: IHorarioCatalogo[],
    ...horarioCatalogosToCheck: (IHorarioCatalogo | null | undefined)[]
  ): IHorarioCatalogo[] {
    const horarioCatalogos: IHorarioCatalogo[] = horarioCatalogosToCheck.filter(isPresent);
    if (horarioCatalogos.length > 0) {
      const horarioCatalogoCollectionIdentifiers = horarioCatalogoCollection.map(
        horarioCatalogoItem => getHorarioCatalogoIdentifier(horarioCatalogoItem)!
      );
      const horarioCatalogosToAdd = horarioCatalogos.filter(horarioCatalogoItem => {
        const horarioCatalogoIdentifier = getHorarioCatalogoIdentifier(horarioCatalogoItem);
        if (horarioCatalogoIdentifier == null || horarioCatalogoCollectionIdentifiers.includes(horarioCatalogoIdentifier)) {
          return false;
        }
        horarioCatalogoCollectionIdentifiers.push(horarioCatalogoIdentifier);
        return true;
      });
      return [...horarioCatalogosToAdd, ...horarioCatalogoCollection];
    }
    return horarioCatalogoCollection;
  }
}
