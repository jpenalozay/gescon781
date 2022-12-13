import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProgramacion, getProgramacionIdentifier } from '../programacion.model';

export type EntityResponseType = HttpResponse<IProgramacion>;
export type EntityArrayResponseType = HttpResponse<IProgramacion[]>;

@Injectable({ providedIn: 'root' })
export class ProgramacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/programacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(programacion: IProgramacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programacion);
    return this.http
      .post<IProgramacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(programacion: IProgramacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programacion);
    return this.http
      .put<IProgramacion>(`${this.resourceUrl}/${getProgramacionIdentifier(programacion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(programacion: IProgramacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programacion);
    return this.http
      .patch<IProgramacion>(`${this.resourceUrl}/${getProgramacionIdentifier(programacion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProgramacion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProgramacion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProgramacionToCollectionIfMissing(
    programacionCollection: IProgramacion[],
    ...programacionsToCheck: (IProgramacion | null | undefined)[]
  ): IProgramacion[] {
    const programacions: IProgramacion[] = programacionsToCheck.filter(isPresent);
    if (programacions.length > 0) {
      const programacionCollectionIdentifiers = programacionCollection.map(
        programacionItem => getProgramacionIdentifier(programacionItem)!
      );
      const programacionsToAdd = programacions.filter(programacionItem => {
        const programacionIdentifier = getProgramacionIdentifier(programacionItem);
        if (programacionIdentifier == null || programacionCollectionIdentifiers.includes(programacionIdentifier)) {
          return false;
        }
        programacionCollectionIdentifiers.push(programacionIdentifier);
        return true;
      });
      return [...programacionsToAdd, ...programacionCollection];
    }
    return programacionCollection;
  }

  protected convertDateFromClient(programacion: IProgramacion): IProgramacion {
    return Object.assign({}, programacion, {
      fechaInicio: programacion.fechaInicio?.isValid() ? programacion.fechaInicio.format(DATE_FORMAT) : undefined,
      fechaFin: programacion.fechaFin?.isValid() ? programacion.fechaFin.format(DATE_FORMAT) : undefined,
      fecha: programacion.fecha?.isValid() ? programacion.fecha.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio ? dayjs(res.body.fechaInicio) : undefined;
      res.body.fechaFin = res.body.fechaFin ? dayjs(res.body.fechaFin) : undefined;
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((programacion: IProgramacion) => {
        programacion.fechaInicio = programacion.fechaInicio ? dayjs(programacion.fechaInicio) : undefined;
        programacion.fechaFin = programacion.fechaFin ? dayjs(programacion.fechaFin) : undefined;
        programacion.fecha = programacion.fecha ? dayjs(programacion.fecha) : undefined;
      });
    }
    return res;
  }
}
