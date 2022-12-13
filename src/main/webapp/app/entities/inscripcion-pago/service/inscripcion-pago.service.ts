import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInscripcionPago, getInscripcionPagoIdentifier } from '../inscripcion-pago.model';

export type EntityResponseType = HttpResponse<IInscripcionPago>;
export type EntityArrayResponseType = HttpResponse<IInscripcionPago[]>;

@Injectable({ providedIn: 'root' })
export class InscripcionPagoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/inscripcion-pagos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(inscripcionPago: IInscripcionPago): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripcionPago);
    return this.http
      .post<IInscripcionPago>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inscripcionPago: IInscripcionPago): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripcionPago);
    return this.http
      .put<IInscripcionPago>(`${this.resourceUrl}/${getInscripcionPagoIdentifier(inscripcionPago) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(inscripcionPago: IInscripcionPago): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripcionPago);
    return this.http
      .patch<IInscripcionPago>(`${this.resourceUrl}/${getInscripcionPagoIdentifier(inscripcionPago) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInscripcionPago>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInscripcionPago[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInscripcionPagoToCollectionIfMissing(
    inscripcionPagoCollection: IInscripcionPago[],
    ...inscripcionPagosToCheck: (IInscripcionPago | null | undefined)[]
  ): IInscripcionPago[] {
    const inscripcionPagos: IInscripcionPago[] = inscripcionPagosToCheck.filter(isPresent);
    if (inscripcionPagos.length > 0) {
      const inscripcionPagoCollectionIdentifiers = inscripcionPagoCollection.map(
        inscripcionPagoItem => getInscripcionPagoIdentifier(inscripcionPagoItem)!
      );
      const inscripcionPagosToAdd = inscripcionPagos.filter(inscripcionPagoItem => {
        const inscripcionPagoIdentifier = getInscripcionPagoIdentifier(inscripcionPagoItem);
        if (inscripcionPagoIdentifier == null || inscripcionPagoCollectionIdentifiers.includes(inscripcionPagoIdentifier)) {
          return false;
        }
        inscripcionPagoCollectionIdentifiers.push(inscripcionPagoIdentifier);
        return true;
      });
      return [...inscripcionPagosToAdd, ...inscripcionPagoCollection];
    }
    return inscripcionPagoCollection;
  }

  protected convertDateFromClient(inscripcionPago: IInscripcionPago): IInscripcionPago {
    return Object.assign({}, inscripcionPago, {
      fecha: inscripcionPago.fecha?.isValid() ? inscripcionPago.fecha.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((inscripcionPago: IInscripcionPago) => {
        inscripcionPago.fecha = inscripcionPago.fecha ? dayjs(inscripcionPago.fecha) : undefined;
      });
    }
    return res;
  }
}
