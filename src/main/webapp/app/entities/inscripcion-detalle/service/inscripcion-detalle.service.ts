import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInscripcionDetalle, getInscripcionDetalleIdentifier } from '../inscripcion-detalle.model';

export type EntityResponseType = HttpResponse<IInscripcionDetalle>;
export type EntityArrayResponseType = HttpResponse<IInscripcionDetalle[]>;

@Injectable({ providedIn: 'root' })
export class InscripcionDetalleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/inscripcion-detalles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(inscripcionDetalle: IInscripcionDetalle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripcionDetalle);
    return this.http
      .post<IInscripcionDetalle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inscripcionDetalle: IInscripcionDetalle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripcionDetalle);
    return this.http
      .put<IInscripcionDetalle>(`${this.resourceUrl}/${getInscripcionDetalleIdentifier(inscripcionDetalle) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(inscripcionDetalle: IInscripcionDetalle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripcionDetalle);
    return this.http
      .patch<IInscripcionDetalle>(`${this.resourceUrl}/${getInscripcionDetalleIdentifier(inscripcionDetalle) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInscripcionDetalle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInscripcionDetalle[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInscripcionDetalleToCollectionIfMissing(
    inscripcionDetalleCollection: IInscripcionDetalle[],
    ...inscripcionDetallesToCheck: (IInscripcionDetalle | null | undefined)[]
  ): IInscripcionDetalle[] {
    const inscripcionDetalles: IInscripcionDetalle[] = inscripcionDetallesToCheck.filter(isPresent);
    if (inscripcionDetalles.length > 0) {
      const inscripcionDetalleCollectionIdentifiers = inscripcionDetalleCollection.map(
        inscripcionDetalleItem => getInscripcionDetalleIdentifier(inscripcionDetalleItem)!
      );
      const inscripcionDetallesToAdd = inscripcionDetalles.filter(inscripcionDetalleItem => {
        const inscripcionDetalleIdentifier = getInscripcionDetalleIdentifier(inscripcionDetalleItem);
        if (inscripcionDetalleIdentifier == null || inscripcionDetalleCollectionIdentifiers.includes(inscripcionDetalleIdentifier)) {
          return false;
        }
        inscripcionDetalleCollectionIdentifiers.push(inscripcionDetalleIdentifier);
        return true;
      });
      return [...inscripcionDetallesToAdd, ...inscripcionDetalleCollection];
    }
    return inscripcionDetalleCollection;
  }

  protected convertDateFromClient(inscripcionDetalle: IInscripcionDetalle): IInscripcionDetalle {
    return Object.assign({}, inscripcionDetalle, {
      fechaInicio: inscripcionDetalle.fechaInicio?.isValid() ? inscripcionDetalle.fechaInicio.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio ? dayjs(res.body.fechaInicio) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((inscripcionDetalle: IInscripcionDetalle) => {
        inscripcionDetalle.fechaInicio = inscripcionDetalle.fechaInicio ? dayjs(inscripcionDetalle.fechaInicio) : undefined;
      });
    }
    return res;
  }
}
