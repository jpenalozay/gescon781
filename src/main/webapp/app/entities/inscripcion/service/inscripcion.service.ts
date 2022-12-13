import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInscripcion, getInscripcionIdentifier } from '../inscripcion.model';

export type EntityResponseType = HttpResponse<IInscripcion>;
export type EntityArrayResponseType = HttpResponse<IInscripcion[]>;

@Injectable({ providedIn: 'root' })
export class InscripcionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/inscripcions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(inscripcion: IInscripcion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripcion);
    return this.http
      .post<IInscripcion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inscripcion: IInscripcion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripcion);
    return this.http
      .put<IInscripcion>(`${this.resourceUrl}/${getInscripcionIdentifier(inscripcion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(inscripcion: IInscripcion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripcion);
    return this.http
      .patch<IInscripcion>(`${this.resourceUrl}/${getInscripcionIdentifier(inscripcion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInscripcion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInscripcion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInscripcionToCollectionIfMissing(
    inscripcionCollection: IInscripcion[],
    ...inscripcionsToCheck: (IInscripcion | null | undefined)[]
  ): IInscripcion[] {
    const inscripcions: IInscripcion[] = inscripcionsToCheck.filter(isPresent);
    if (inscripcions.length > 0) {
      const inscripcionCollectionIdentifiers = inscripcionCollection.map(inscripcionItem => getInscripcionIdentifier(inscripcionItem)!);
      const inscripcionsToAdd = inscripcions.filter(inscripcionItem => {
        const inscripcionIdentifier = getInscripcionIdentifier(inscripcionItem);
        if (inscripcionIdentifier == null || inscripcionCollectionIdentifiers.includes(inscripcionIdentifier)) {
          return false;
        }
        inscripcionCollectionIdentifiers.push(inscripcionIdentifier);
        return true;
      });
      return [...inscripcionsToAdd, ...inscripcionCollection];
    }
    return inscripcionCollection;
  }

  protected convertDateFromClient(inscripcion: IInscripcion): IInscripcion {
    return Object.assign({}, inscripcion, {
      fecha: inscripcion.fecha?.isValid() ? inscripcion.fecha.toJSON() : undefined,
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
      res.body.forEach((inscripcion: IInscripcion) => {
        inscripcion.fecha = inscripcion.fecha ? dayjs(inscripcion.fecha) : undefined;
      });
    }
    return res;
  }
}
