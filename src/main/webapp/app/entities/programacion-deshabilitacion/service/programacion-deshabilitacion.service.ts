import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProgramacionDeshabilitacion, getProgramacionDeshabilitacionIdentifier } from '../programacion-deshabilitacion.model';

export type EntityResponseType = HttpResponse<IProgramacionDeshabilitacion>;
export type EntityArrayResponseType = HttpResponse<IProgramacionDeshabilitacion[]>;

@Injectable({ providedIn: 'root' })
export class ProgramacionDeshabilitacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/programacion-deshabilitacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(programacionDeshabilitacion: IProgramacionDeshabilitacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programacionDeshabilitacion);
    return this.http
      .post<IProgramacionDeshabilitacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(programacionDeshabilitacion: IProgramacionDeshabilitacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programacionDeshabilitacion);
    return this.http
      .put<IProgramacionDeshabilitacion>(
        `${this.resourceUrl}/${getProgramacionDeshabilitacionIdentifier(programacionDeshabilitacion) as number}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(programacionDeshabilitacion: IProgramacionDeshabilitacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programacionDeshabilitacion);
    return this.http
      .patch<IProgramacionDeshabilitacion>(
        `${this.resourceUrl}/${getProgramacionDeshabilitacionIdentifier(programacionDeshabilitacion) as number}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProgramacionDeshabilitacion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProgramacionDeshabilitacion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProgramacionDeshabilitacionToCollectionIfMissing(
    programacionDeshabilitacionCollection: IProgramacionDeshabilitacion[],
    ...programacionDeshabilitacionsToCheck: (IProgramacionDeshabilitacion | null | undefined)[]
  ): IProgramacionDeshabilitacion[] {
    const programacionDeshabilitacions: IProgramacionDeshabilitacion[] = programacionDeshabilitacionsToCheck.filter(isPresent);
    if (programacionDeshabilitacions.length > 0) {
      const programacionDeshabilitacionCollectionIdentifiers = programacionDeshabilitacionCollection.map(
        programacionDeshabilitacionItem => getProgramacionDeshabilitacionIdentifier(programacionDeshabilitacionItem)!
      );
      const programacionDeshabilitacionsToAdd = programacionDeshabilitacions.filter(programacionDeshabilitacionItem => {
        const programacionDeshabilitacionIdentifier = getProgramacionDeshabilitacionIdentifier(programacionDeshabilitacionItem);
        if (
          programacionDeshabilitacionIdentifier == null ||
          programacionDeshabilitacionCollectionIdentifiers.includes(programacionDeshabilitacionIdentifier)
        ) {
          return false;
        }
        programacionDeshabilitacionCollectionIdentifiers.push(programacionDeshabilitacionIdentifier);
        return true;
      });
      return [...programacionDeshabilitacionsToAdd, ...programacionDeshabilitacionCollection];
    }
    return programacionDeshabilitacionCollection;
  }

  protected convertDateFromClient(programacionDeshabilitacion: IProgramacionDeshabilitacion): IProgramacionDeshabilitacion {
    return Object.assign({}, programacionDeshabilitacion, {
      fecha: programacionDeshabilitacion.fecha?.isValid() ? programacionDeshabilitacion.fecha.toJSON() : undefined,
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
      res.body.forEach((programacionDeshabilitacion: IProgramacionDeshabilitacion) => {
        programacionDeshabilitacion.fecha = programacionDeshabilitacion.fecha ? dayjs(programacionDeshabilitacion.fecha) : undefined;
      });
    }
    return res;
  }
}
