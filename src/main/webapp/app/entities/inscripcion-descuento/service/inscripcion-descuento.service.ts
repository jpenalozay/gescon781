import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInscripcionDescuento, getInscripcionDescuentoIdentifier } from '../inscripcion-descuento.model';

export type EntityResponseType = HttpResponse<IInscripcionDescuento>;
export type EntityArrayResponseType = HttpResponse<IInscripcionDescuento[]>;

@Injectable({ providedIn: 'root' })
export class InscripcionDescuentoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/inscripcion-descuentos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(inscripcionDescuento: IInscripcionDescuento): Observable<EntityResponseType> {
    return this.http.post<IInscripcionDescuento>(this.resourceUrl, inscripcionDescuento, { observe: 'response' });
  }

  update(inscripcionDescuento: IInscripcionDescuento): Observable<EntityResponseType> {
    return this.http.put<IInscripcionDescuento>(
      `${this.resourceUrl}/${getInscripcionDescuentoIdentifier(inscripcionDescuento) as number}`,
      inscripcionDescuento,
      { observe: 'response' }
    );
  }

  partialUpdate(inscripcionDescuento: IInscripcionDescuento): Observable<EntityResponseType> {
    return this.http.patch<IInscripcionDescuento>(
      `${this.resourceUrl}/${getInscripcionDescuentoIdentifier(inscripcionDescuento) as number}`,
      inscripcionDescuento,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInscripcionDescuento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInscripcionDescuento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInscripcionDescuentoToCollectionIfMissing(
    inscripcionDescuentoCollection: IInscripcionDescuento[],
    ...inscripcionDescuentosToCheck: (IInscripcionDescuento | null | undefined)[]
  ): IInscripcionDescuento[] {
    const inscripcionDescuentos: IInscripcionDescuento[] = inscripcionDescuentosToCheck.filter(isPresent);
    if (inscripcionDescuentos.length > 0) {
      const inscripcionDescuentoCollectionIdentifiers = inscripcionDescuentoCollection.map(
        inscripcionDescuentoItem => getInscripcionDescuentoIdentifier(inscripcionDescuentoItem)!
      );
      const inscripcionDescuentosToAdd = inscripcionDescuentos.filter(inscripcionDescuentoItem => {
        const inscripcionDescuentoIdentifier = getInscripcionDescuentoIdentifier(inscripcionDescuentoItem);
        if (inscripcionDescuentoIdentifier == null || inscripcionDescuentoCollectionIdentifiers.includes(inscripcionDescuentoIdentifier)) {
          return false;
        }
        inscripcionDescuentoCollectionIdentifiers.push(inscripcionDescuentoIdentifier);
        return true;
      });
      return [...inscripcionDescuentosToAdd, ...inscripcionDescuentoCollection];
    }
    return inscripcionDescuentoCollection;
  }
}
