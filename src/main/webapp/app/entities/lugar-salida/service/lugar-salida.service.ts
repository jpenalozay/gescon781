import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILugarSalida, getLugarSalidaIdentifier } from '../lugar-salida.model';

export type EntityResponseType = HttpResponse<ILugarSalida>;
export type EntityArrayResponseType = HttpResponse<ILugarSalida[]>;

@Injectable({ providedIn: 'root' })
export class LugarSalidaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lugar-salidas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(lugarSalida: ILugarSalida): Observable<EntityResponseType> {
    return this.http.post<ILugarSalida>(this.resourceUrl, lugarSalida, { observe: 'response' });
  }

  update(lugarSalida: ILugarSalida): Observable<EntityResponseType> {
    return this.http.put<ILugarSalida>(`${this.resourceUrl}/${getLugarSalidaIdentifier(lugarSalida) as number}`, lugarSalida, {
      observe: 'response',
    });
  }

  partialUpdate(lugarSalida: ILugarSalida): Observable<EntityResponseType> {
    return this.http.patch<ILugarSalida>(`${this.resourceUrl}/${getLugarSalidaIdentifier(lugarSalida) as number}`, lugarSalida, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILugarSalida>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILugarSalida[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLugarSalidaToCollectionIfMissing(
    lugarSalidaCollection: ILugarSalida[],
    ...lugarSalidasToCheck: (ILugarSalida | null | undefined)[]
  ): ILugarSalida[] {
    const lugarSalidas: ILugarSalida[] = lugarSalidasToCheck.filter(isPresent);
    if (lugarSalidas.length > 0) {
      const lugarSalidaCollectionIdentifiers = lugarSalidaCollection.map(lugarSalidaItem => getLugarSalidaIdentifier(lugarSalidaItem)!);
      const lugarSalidasToAdd = lugarSalidas.filter(lugarSalidaItem => {
        const lugarSalidaIdentifier = getLugarSalidaIdentifier(lugarSalidaItem);
        if (lugarSalidaIdentifier == null || lugarSalidaCollectionIdentifiers.includes(lugarSalidaIdentifier)) {
          return false;
        }
        lugarSalidaCollectionIdentifiers.push(lugarSalidaIdentifier);
        return true;
      });
      return [...lugarSalidasToAdd, ...lugarSalidaCollection];
    }
    return lugarSalidaCollection;
  }
}
