import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlumnoUsuario, getAlumnoUsuarioIdentifier } from '../alumno-usuario.model';

export type EntityResponseType = HttpResponse<IAlumnoUsuario>;
export type EntityArrayResponseType = HttpResponse<IAlumnoUsuario[]>;

@Injectable({ providedIn: 'root' })
export class AlumnoUsuarioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/alumno-usuarios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(alumnoUsuario: IAlumnoUsuario): Observable<EntityResponseType> {
    return this.http.post<IAlumnoUsuario>(this.resourceUrl, alumnoUsuario, { observe: 'response' });
  }

  update(alumnoUsuario: IAlumnoUsuario): Observable<EntityResponseType> {
    return this.http.put<IAlumnoUsuario>(`${this.resourceUrl}/${getAlumnoUsuarioIdentifier(alumnoUsuario) as number}`, alumnoUsuario, {
      observe: 'response',
    });
  }

  partialUpdate(alumnoUsuario: IAlumnoUsuario): Observable<EntityResponseType> {
    return this.http.patch<IAlumnoUsuario>(`${this.resourceUrl}/${getAlumnoUsuarioIdentifier(alumnoUsuario) as number}`, alumnoUsuario, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlumnoUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlumnoUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAlumnoUsuarioToCollectionIfMissing(
    alumnoUsuarioCollection: IAlumnoUsuario[],
    ...alumnoUsuariosToCheck: (IAlumnoUsuario | null | undefined)[]
  ): IAlumnoUsuario[] {
    const alumnoUsuarios: IAlumnoUsuario[] = alumnoUsuariosToCheck.filter(isPresent);
    if (alumnoUsuarios.length > 0) {
      const alumnoUsuarioCollectionIdentifiers = alumnoUsuarioCollection.map(
        alumnoUsuarioItem => getAlumnoUsuarioIdentifier(alumnoUsuarioItem)!
      );
      const alumnoUsuariosToAdd = alumnoUsuarios.filter(alumnoUsuarioItem => {
        const alumnoUsuarioIdentifier = getAlumnoUsuarioIdentifier(alumnoUsuarioItem);
        if (alumnoUsuarioIdentifier == null || alumnoUsuarioCollectionIdentifiers.includes(alumnoUsuarioIdentifier)) {
          return false;
        }
        alumnoUsuarioCollectionIdentifiers.push(alumnoUsuarioIdentifier);
        return true;
      });
      return [...alumnoUsuariosToAdd, ...alumnoUsuarioCollection];
    }
    return alumnoUsuarioCollection;
  }
}
