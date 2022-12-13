import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlumnoClases, getAlumnoClasesIdentifier } from '../alumno-clases.model';

export type EntityResponseType = HttpResponse<IAlumnoClases>;
export type EntityArrayResponseType = HttpResponse<IAlumnoClases[]>;

@Injectable({ providedIn: 'root' })
export class AlumnoClasesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/alumno-clases');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(alumnoClases: IAlumnoClases): Observable<EntityResponseType> {
    return this.http.post<IAlumnoClases>(this.resourceUrl, alumnoClases, { observe: 'response' });
  }

  update(alumnoClases: IAlumnoClases): Observable<EntityResponseType> {
    return this.http.put<IAlumnoClases>(`${this.resourceUrl}/${getAlumnoClasesIdentifier(alumnoClases) as number}`, alumnoClases, {
      observe: 'response',
    });
  }

  partialUpdate(alumnoClases: IAlumnoClases): Observable<EntityResponseType> {
    return this.http.patch<IAlumnoClases>(`${this.resourceUrl}/${getAlumnoClasesIdentifier(alumnoClases) as number}`, alumnoClases, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlumnoClases>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlumnoClases[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAlumnoClasesToCollectionIfMissing(
    alumnoClasesCollection: IAlumnoClases[],
    ...alumnoClasesToCheck: (IAlumnoClases | null | undefined)[]
  ): IAlumnoClases[] {
    const alumnoClases: IAlumnoClases[] = alumnoClasesToCheck.filter(isPresent);
    if (alumnoClases.length > 0) {
      const alumnoClasesCollectionIdentifiers = alumnoClasesCollection.map(
        alumnoClasesItem => getAlumnoClasesIdentifier(alumnoClasesItem)!
      );
      const alumnoClasesToAdd = alumnoClases.filter(alumnoClasesItem => {
        const alumnoClasesIdentifier = getAlumnoClasesIdentifier(alumnoClasesItem);
        if (alumnoClasesIdentifier == null || alumnoClasesCollectionIdentifiers.includes(alumnoClasesIdentifier)) {
          return false;
        }
        alumnoClasesCollectionIdentifiers.push(alumnoClasesIdentifier);
        return true;
      });
      return [...alumnoClasesToAdd, ...alumnoClasesCollection];
    }
    return alumnoClasesCollection;
  }
}
