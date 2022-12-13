import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInscripcionAdicional, getInscripcionAdicionalIdentifier } from '../inscripcion-adicional.model';

export type EntityResponseType = HttpResponse<IInscripcionAdicional>;
export type EntityArrayResponseType = HttpResponse<IInscripcionAdicional[]>;

@Injectable({ providedIn: 'root' })
export class InscripcionAdicionalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/inscripcion-adicionals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(inscripcionAdicional: IInscripcionAdicional): Observable<EntityResponseType> {
    return this.http.post<IInscripcionAdicional>(this.resourceUrl, inscripcionAdicional, { observe: 'response' });
  }

  update(inscripcionAdicional: IInscripcionAdicional): Observable<EntityResponseType> {
    return this.http.put<IInscripcionAdicional>(
      `${this.resourceUrl}/${getInscripcionAdicionalIdentifier(inscripcionAdicional) as number}`,
      inscripcionAdicional,
      { observe: 'response' }
    );
  }

  partialUpdate(inscripcionAdicional: IInscripcionAdicional): Observable<EntityResponseType> {
    return this.http.patch<IInscripcionAdicional>(
      `${this.resourceUrl}/${getInscripcionAdicionalIdentifier(inscripcionAdicional) as number}`,
      inscripcionAdicional,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInscripcionAdicional>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInscripcionAdicional[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInscripcionAdicionalToCollectionIfMissing(
    inscripcionAdicionalCollection: IInscripcionAdicional[],
    ...inscripcionAdicionalsToCheck: (IInscripcionAdicional | null | undefined)[]
  ): IInscripcionAdicional[] {
    const inscripcionAdicionals: IInscripcionAdicional[] = inscripcionAdicionalsToCheck.filter(isPresent);
    if (inscripcionAdicionals.length > 0) {
      const inscripcionAdicionalCollectionIdentifiers = inscripcionAdicionalCollection.map(
        inscripcionAdicionalItem => getInscripcionAdicionalIdentifier(inscripcionAdicionalItem)!
      );
      const inscripcionAdicionalsToAdd = inscripcionAdicionals.filter(inscripcionAdicionalItem => {
        const inscripcionAdicionalIdentifier = getInscripcionAdicionalIdentifier(inscripcionAdicionalItem);
        if (inscripcionAdicionalIdentifier == null || inscripcionAdicionalCollectionIdentifiers.includes(inscripcionAdicionalIdentifier)) {
          return false;
        }
        inscripcionAdicionalCollectionIdentifiers.push(inscripcionAdicionalIdentifier);
        return true;
      });
      return [...inscripcionAdicionalsToAdd, ...inscripcionAdicionalCollection];
    }
    return inscripcionAdicionalCollection;
  }
}
