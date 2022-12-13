import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITeoria, getTeoriaIdentifier } from '../teoria.model';

export type EntityResponseType = HttpResponse<ITeoria>;
export type EntityArrayResponseType = HttpResponse<ITeoria[]>;

@Injectable({ providedIn: 'root' })
export class TeoriaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/teorias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(teoria: ITeoria): Observable<EntityResponseType> {
    return this.http.post<ITeoria>(this.resourceUrl, teoria, { observe: 'response' });
  }

  update(teoria: ITeoria): Observable<EntityResponseType> {
    return this.http.put<ITeoria>(`${this.resourceUrl}/${getTeoriaIdentifier(teoria) as number}`, teoria, { observe: 'response' });
  }

  partialUpdate(teoria: ITeoria): Observable<EntityResponseType> {
    return this.http.patch<ITeoria>(`${this.resourceUrl}/${getTeoriaIdentifier(teoria) as number}`, teoria, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITeoria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITeoria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTeoriaToCollectionIfMissing(teoriaCollection: ITeoria[], ...teoriasToCheck: (ITeoria | null | undefined)[]): ITeoria[] {
    const teorias: ITeoria[] = teoriasToCheck.filter(isPresent);
    if (teorias.length > 0) {
      const teoriaCollectionIdentifiers = teoriaCollection.map(teoriaItem => getTeoriaIdentifier(teoriaItem)!);
      const teoriasToAdd = teorias.filter(teoriaItem => {
        const teoriaIdentifier = getTeoriaIdentifier(teoriaItem);
        if (teoriaIdentifier == null || teoriaCollectionIdentifiers.includes(teoriaIdentifier)) {
          return false;
        }
        teoriaCollectionIdentifiers.push(teoriaIdentifier);
        return true;
      });
      return [...teoriasToAdd, ...teoriaCollection];
    }
    return teoriaCollection;
  }
}
