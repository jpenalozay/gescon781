import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDia, getDiaIdentifier } from '../dia.model';

export type EntityResponseType = HttpResponse<IDia>;
export type EntityArrayResponseType = HttpResponse<IDia[]>;

@Injectable({ providedIn: 'root' })
export class DiaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(dia: IDia): Observable<EntityResponseType> {
    return this.http.post<IDia>(this.resourceUrl, dia, { observe: 'response' });
  }

  update(dia: IDia): Observable<EntityResponseType> {
    return this.http.put<IDia>(`${this.resourceUrl}/${getDiaIdentifier(dia) as number}`, dia, { observe: 'response' });
  }

  partialUpdate(dia: IDia): Observable<EntityResponseType> {
    return this.http.patch<IDia>(`${this.resourceUrl}/${getDiaIdentifier(dia) as number}`, dia, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDia[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDiaToCollectionIfMissing(diaCollection: IDia[], ...diasToCheck: (IDia | null | undefined)[]): IDia[] {
    const dias: IDia[] = diasToCheck.filter(isPresent);
    if (dias.length > 0) {
      const diaCollectionIdentifiers = diaCollection.map(diaItem => getDiaIdentifier(diaItem)!);
      const diasToAdd = dias.filter(diaItem => {
        const diaIdentifier = getDiaIdentifier(diaItem);
        if (diaIdentifier == null || diaCollectionIdentifiers.includes(diaIdentifier)) {
          return false;
        }
        diaCollectionIdentifiers.push(diaIdentifier);
        return true;
      });
      return [...diasToAdd, ...diaCollection];
    }
    return diaCollection;
  }
}
