import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISucursalSerie, getSucursalSerieIdentifier } from '../sucursal-serie.model';

export type EntityResponseType = HttpResponse<ISucursalSerie>;
export type EntityArrayResponseType = HttpResponse<ISucursalSerie[]>;

@Injectable({ providedIn: 'root' })
export class SucursalSerieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sucursal-series');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sucursalSerie: ISucursalSerie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sucursalSerie);
    return this.http
      .post<ISucursalSerie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sucursalSerie: ISucursalSerie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sucursalSerie);
    return this.http
      .put<ISucursalSerie>(`${this.resourceUrl}/${getSucursalSerieIdentifier(sucursalSerie) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(sucursalSerie: ISucursalSerie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sucursalSerie);
    return this.http
      .patch<ISucursalSerie>(`${this.resourceUrl}/${getSucursalSerieIdentifier(sucursalSerie) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISucursalSerie>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISucursalSerie[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSucursalSerieToCollectionIfMissing(
    sucursalSerieCollection: ISucursalSerie[],
    ...sucursalSeriesToCheck: (ISucursalSerie | null | undefined)[]
  ): ISucursalSerie[] {
    const sucursalSeries: ISucursalSerie[] = sucursalSeriesToCheck.filter(isPresent);
    if (sucursalSeries.length > 0) {
      const sucursalSerieCollectionIdentifiers = sucursalSerieCollection.map(
        sucursalSerieItem => getSucursalSerieIdentifier(sucursalSerieItem)!
      );
      const sucursalSeriesToAdd = sucursalSeries.filter(sucursalSerieItem => {
        const sucursalSerieIdentifier = getSucursalSerieIdentifier(sucursalSerieItem);
        if (sucursalSerieIdentifier == null || sucursalSerieCollectionIdentifiers.includes(sucursalSerieIdentifier)) {
          return false;
        }
        sucursalSerieCollectionIdentifiers.push(sucursalSerieIdentifier);
        return true;
      });
      return [...sucursalSeriesToAdd, ...sucursalSerieCollection];
    }
    return sucursalSerieCollection;
  }

  protected convertDateFromClient(sucursalSerie: ISucursalSerie): ISucursalSerie {
    return Object.assign({}, sucursalSerie, {
      fechaEmision: sucursalSerie.fechaEmision?.isValid() ? sucursalSerie.fechaEmision.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaEmision = res.body.fechaEmision ? dayjs(res.body.fechaEmision) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sucursalSerie: ISucursalSerie) => {
        sucursalSerie.fechaEmision = sucursalSerie.fechaEmision ? dayjs(sucursalSerie.fechaEmision) : undefined;
      });
    }
    return res;
  }
}
