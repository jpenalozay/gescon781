import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFecha, getFechaIdentifier } from '../fecha.model';

export type EntityResponseType = HttpResponse<IFecha>;
export type EntityArrayResponseType = HttpResponse<IFecha[]>;

@Injectable({ providedIn: 'root' })
export class FechaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fechas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFecha>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFecha[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addFechaToCollectionIfMissing(fechaCollection: IFecha[], ...fechasToCheck: (IFecha | null | undefined)[]): IFecha[] {
    const fechas: IFecha[] = fechasToCheck.filter(isPresent);
    if (fechas.length > 0) {
      const fechaCollectionIdentifiers = fechaCollection.map(fechaItem => getFechaIdentifier(fechaItem)!);
      const fechasToAdd = fechas.filter(fechaItem => {
        const fechaIdentifier = getFechaIdentifier(fechaItem);
        if (fechaIdentifier == null || fechaCollectionIdentifiers.includes(fechaIdentifier)) {
          return false;
        }
        fechaCollectionIdentifiers.push(fechaIdentifier);
        return true;
      });
      return [...fechasToAdd, ...fechaCollection];
    }
    return fechaCollection;
  }

  protected convertDateFromClient(fecha: IFecha): IFecha {
    return Object.assign({}, fecha, {
      fecha: fecha.fecha?.isValid() ? fecha.fecha.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((fecha: IFecha) => {
        fecha.fecha = fecha.fecha ? dayjs(fecha.fecha) : undefined;
      });
    }
    return res;
  }
}
