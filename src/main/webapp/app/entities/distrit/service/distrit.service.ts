import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDistrit, getDistritIdentifier } from '../distrit.model';

export type EntityResponseType = HttpResponse<IDistrit>;
export type EntityArrayResponseType = HttpResponse<IDistrit[]>;

@Injectable({ providedIn: 'root' })
export class DistritService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/distrits');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDistrit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDistrit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  addDistritToCollectionIfMissing(distritCollection: IDistrit[], ...distritsToCheck: (IDistrit | null | undefined)[]): IDistrit[] {
    const distrits: IDistrit[] = distritsToCheck.filter(isPresent);
    if (distrits.length > 0) {
      const distritCollectionIdentifiers = distritCollection.map(distritItem => getDistritIdentifier(distritItem)!);
      const distritsToAdd = distrits.filter(distritItem => {
        const distritIdentifier = getDistritIdentifier(distritItem);
        if (distritIdentifier == null || distritCollectionIdentifiers.includes(distritIdentifier)) {
          return false;
        }
        distritCollectionIdentifiers.push(distritIdentifier);
        return true;
      });
      return [...distritsToAdd, ...distritCollection];
    }
    return distritCollection;
  }
}
