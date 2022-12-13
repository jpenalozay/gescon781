import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHorarioDeshabilitacion, getHorarioDeshabilitacionIdentifier } from '../horario-deshabilitacion.model';

export type EntityResponseType = HttpResponse<IHorarioDeshabilitacion>;
export type EntityArrayResponseType = HttpResponse<IHorarioDeshabilitacion[]>;

@Injectable({ providedIn: 'root' })
export class HorarioDeshabilitacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/horario-deshabilitacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(horarioDeshabilitacion: IHorarioDeshabilitacion): Observable<EntityResponseType> {
    return this.http.post<IHorarioDeshabilitacion>(this.resourceUrl, horarioDeshabilitacion, { observe: 'response' });
  }

  update(horarioDeshabilitacion: IHorarioDeshabilitacion): Observable<EntityResponseType> {
    return this.http.put<IHorarioDeshabilitacion>(
      `${this.resourceUrl}/${getHorarioDeshabilitacionIdentifier(horarioDeshabilitacion) as number}`,
      horarioDeshabilitacion,
      { observe: 'response' }
    );
  }

  partialUpdate(horarioDeshabilitacion: IHorarioDeshabilitacion): Observable<EntityResponseType> {
    return this.http.patch<IHorarioDeshabilitacion>(
      `${this.resourceUrl}/${getHorarioDeshabilitacionIdentifier(horarioDeshabilitacion) as number}`,
      horarioDeshabilitacion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHorarioDeshabilitacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHorarioDeshabilitacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHorarioDeshabilitacionToCollectionIfMissing(
    horarioDeshabilitacionCollection: IHorarioDeshabilitacion[],
    ...horarioDeshabilitacionsToCheck: (IHorarioDeshabilitacion | null | undefined)[]
  ): IHorarioDeshabilitacion[] {
    const horarioDeshabilitacions: IHorarioDeshabilitacion[] = horarioDeshabilitacionsToCheck.filter(isPresent);
    if (horarioDeshabilitacions.length > 0) {
      const horarioDeshabilitacionCollectionIdentifiers = horarioDeshabilitacionCollection.map(
        horarioDeshabilitacionItem => getHorarioDeshabilitacionIdentifier(horarioDeshabilitacionItem)!
      );
      const horarioDeshabilitacionsToAdd = horarioDeshabilitacions.filter(horarioDeshabilitacionItem => {
        const horarioDeshabilitacionIdentifier = getHorarioDeshabilitacionIdentifier(horarioDeshabilitacionItem);
        if (
          horarioDeshabilitacionIdentifier == null ||
          horarioDeshabilitacionCollectionIdentifiers.includes(horarioDeshabilitacionIdentifier)
        ) {
          return false;
        }
        horarioDeshabilitacionCollectionIdentifiers.push(horarioDeshabilitacionIdentifier);
        return true;
      });
      return [...horarioDeshabilitacionsToAdd, ...horarioDeshabilitacionCollection];
    }
    return horarioDeshabilitacionCollection;
  }
}
