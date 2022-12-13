import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlumnoDesarrollo, getAlumnoDesarrolloIdentifier } from '../alumno-desarrollo.model';

export type EntityResponseType = HttpResponse<IAlumnoDesarrollo>;
export type EntityArrayResponseType = HttpResponse<IAlumnoDesarrollo[]>;

@Injectable({ providedIn: 'root' })
export class AlumnoDesarrolloService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/alumno-desarrollos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(alumnoDesarrollo: IAlumnoDesarrollo): Observable<EntityResponseType> {
    return this.http.post<IAlumnoDesarrollo>(this.resourceUrl, alumnoDesarrollo, { observe: 'response' });
  }

  update(alumnoDesarrollo: IAlumnoDesarrollo): Observable<EntityResponseType> {
    return this.http.put<IAlumnoDesarrollo>(
      `${this.resourceUrl}/${getAlumnoDesarrolloIdentifier(alumnoDesarrollo) as number}`,
      alumnoDesarrollo,
      { observe: 'response' }
    );
  }

  partialUpdate(alumnoDesarrollo: IAlumnoDesarrollo): Observable<EntityResponseType> {
    return this.http.patch<IAlumnoDesarrollo>(
      `${this.resourceUrl}/${getAlumnoDesarrolloIdentifier(alumnoDesarrollo) as number}`,
      alumnoDesarrollo,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlumnoDesarrollo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlumnoDesarrollo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAlumnoDesarrolloToCollectionIfMissing(
    alumnoDesarrolloCollection: IAlumnoDesarrollo[],
    ...alumnoDesarrollosToCheck: (IAlumnoDesarrollo | null | undefined)[]
  ): IAlumnoDesarrollo[] {
    const alumnoDesarrollos: IAlumnoDesarrollo[] = alumnoDesarrollosToCheck.filter(isPresent);
    if (alumnoDesarrollos.length > 0) {
      const alumnoDesarrolloCollectionIdentifiers = alumnoDesarrolloCollection.map(
        alumnoDesarrolloItem => getAlumnoDesarrolloIdentifier(alumnoDesarrolloItem)!
      );
      const alumnoDesarrollosToAdd = alumnoDesarrollos.filter(alumnoDesarrolloItem => {
        const alumnoDesarrolloIdentifier = getAlumnoDesarrolloIdentifier(alumnoDesarrolloItem);
        if (alumnoDesarrolloIdentifier == null || alumnoDesarrolloCollectionIdentifiers.includes(alumnoDesarrolloIdentifier)) {
          return false;
        }
        alumnoDesarrolloCollectionIdentifiers.push(alumnoDesarrolloIdentifier);
        return true;
      });
      return [...alumnoDesarrollosToAdd, ...alumnoDesarrolloCollection];
    }
    return alumnoDesarrolloCollection;
  }
}
