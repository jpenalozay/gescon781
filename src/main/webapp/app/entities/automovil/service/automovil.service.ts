import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAutomovil, getAutomovilIdentifier } from '../automovil.model';

export type EntityResponseType = HttpResponse<IAutomovil>;
export type EntityArrayResponseType = HttpResponse<IAutomovil[]>;

@Injectable({ providedIn: 'root' })
export class AutomovilService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/automovils');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(automovil: IAutomovil): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(automovil);
    return this.http
      .post<IAutomovil>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(automovil: IAutomovil): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(automovil);
    return this.http
      .put<IAutomovil>(`${this.resourceUrl}/${getAutomovilIdentifier(automovil) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(automovil: IAutomovil): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(automovil);
    return this.http
      .patch<IAutomovil>(`${this.resourceUrl}/${getAutomovilIdentifier(automovil) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAutomovil>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAutomovil[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAutomovilToCollectionIfMissing(
    automovilCollection: IAutomovil[],
    ...automovilsToCheck: (IAutomovil | null | undefined)[]
  ): IAutomovil[] {
    const automovils: IAutomovil[] = automovilsToCheck.filter(isPresent);
    if (automovils.length > 0) {
      const automovilCollectionIdentifiers = automovilCollection.map(automovilItem => getAutomovilIdentifier(automovilItem)!);
      const automovilsToAdd = automovils.filter(automovilItem => {
        const automovilIdentifier = getAutomovilIdentifier(automovilItem);
        if (automovilIdentifier == null || automovilCollectionIdentifiers.includes(automovilIdentifier)) {
          return false;
        }
        automovilCollectionIdentifiers.push(automovilIdentifier);
        return true;
      });
      return [...automovilsToAdd, ...automovilCollection];
    }
    return automovilCollection;
  }

  protected convertDateFromClient(automovil: IAutomovil): IAutomovil {
    return Object.assign({}, automovil, {
      soatVencimiento: automovil.soatVencimiento?.isValid() ? automovil.soatVencimiento.toJSON() : undefined,
      revisionTecnicaVencimiento: automovil.revisionTecnicaVencimiento?.isValid()
        ? automovil.revisionTecnicaVencimiento.toJSON()
        : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.soatVencimiento = res.body.soatVencimiento ? dayjs(res.body.soatVencimiento) : undefined;
      res.body.revisionTecnicaVencimiento = res.body.revisionTecnicaVencimiento ? dayjs(res.body.revisionTecnicaVencimiento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((automovil: IAutomovil) => {
        automovil.soatVencimiento = automovil.soatVencimiento ? dayjs(automovil.soatVencimiento) : undefined;
        automovil.revisionTecnicaVencimiento = automovil.revisionTecnicaVencimiento
          ? dayjs(automovil.revisionTecnicaVencimiento)
          : undefined;
      });
    }
    return res;
  }
}
