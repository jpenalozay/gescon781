import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IComputadora, getComputadoraIdentifier } from '../computadora.model';

export type EntityResponseType = HttpResponse<IComputadora>;
export type EntityArrayResponseType = HttpResponse<IComputadora[]>;

@Injectable({ providedIn: 'root' })
export class ComputadoraService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/computadoras');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(computadora: IComputadora): Observable<EntityResponseType> {
    return this.http.post<IComputadora>(this.resourceUrl, computadora, { observe: 'response' });
  }

  update(computadora: IComputadora): Observable<EntityResponseType> {
    return this.http.put<IComputadora>(`${this.resourceUrl}/${getComputadoraIdentifier(computadora) as number}`, computadora, {
      observe: 'response',
    });
  }

  partialUpdate(computadora: IComputadora): Observable<EntityResponseType> {
    return this.http.patch<IComputadora>(`${this.resourceUrl}/${getComputadoraIdentifier(computadora) as number}`, computadora, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComputadora>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComputadora[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addComputadoraToCollectionIfMissing(
    computadoraCollection: IComputadora[],
    ...computadorasToCheck: (IComputadora | null | undefined)[]
  ): IComputadora[] {
    const computadoras: IComputadora[] = computadorasToCheck.filter(isPresent);
    if (computadoras.length > 0) {
      const computadoraCollectionIdentifiers = computadoraCollection.map(computadoraItem => getComputadoraIdentifier(computadoraItem)!);
      const computadorasToAdd = computadoras.filter(computadoraItem => {
        const computadoraIdentifier = getComputadoraIdentifier(computadoraItem);
        if (computadoraIdentifier == null || computadoraCollectionIdentifiers.includes(computadoraIdentifier)) {
          return false;
        }
        computadoraCollectionIdentifiers.push(computadoraIdentifier);
        return true;
      });
      return [...computadorasToAdd, ...computadoraCollection];
    }
    return computadoraCollection;
  }
}
