import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlumnoCategoria, getAlumnoCategoriaIdentifier } from '../alumno-categoria.model';

export type EntityResponseType = HttpResponse<IAlumnoCategoria>;
export type EntityArrayResponseType = HttpResponse<IAlumnoCategoria[]>;

@Injectable({ providedIn: 'root' })
export class AlumnoCategoriaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/alumno-categorias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(alumnoCategoria: IAlumnoCategoria): Observable<EntityResponseType> {
    return this.http.post<IAlumnoCategoria>(this.resourceUrl, alumnoCategoria, { observe: 'response' });
  }

  update(alumnoCategoria: IAlumnoCategoria): Observable<EntityResponseType> {
    return this.http.put<IAlumnoCategoria>(
      `${this.resourceUrl}/${getAlumnoCategoriaIdentifier(alumnoCategoria) as number}`,
      alumnoCategoria,
      { observe: 'response' }
    );
  }

  partialUpdate(alumnoCategoria: IAlumnoCategoria): Observable<EntityResponseType> {
    return this.http.patch<IAlumnoCategoria>(
      `${this.resourceUrl}/${getAlumnoCategoriaIdentifier(alumnoCategoria) as number}`,
      alumnoCategoria,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlumnoCategoria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlumnoCategoria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAlumnoCategoriaToCollectionIfMissing(
    alumnoCategoriaCollection: IAlumnoCategoria[],
    ...alumnoCategoriasToCheck: (IAlumnoCategoria | null | undefined)[]
  ): IAlumnoCategoria[] {
    const alumnoCategorias: IAlumnoCategoria[] = alumnoCategoriasToCheck.filter(isPresent);
    if (alumnoCategorias.length > 0) {
      const alumnoCategoriaCollectionIdentifiers = alumnoCategoriaCollection.map(
        alumnoCategoriaItem => getAlumnoCategoriaIdentifier(alumnoCategoriaItem)!
      );
      const alumnoCategoriasToAdd = alumnoCategorias.filter(alumnoCategoriaItem => {
        const alumnoCategoriaIdentifier = getAlumnoCategoriaIdentifier(alumnoCategoriaItem);
        if (alumnoCategoriaIdentifier == null || alumnoCategoriaCollectionIdentifiers.includes(alumnoCategoriaIdentifier)) {
          return false;
        }
        alumnoCategoriaCollectionIdentifiers.push(alumnoCategoriaIdentifier);
        return true;
      });
      return [...alumnoCategoriasToAdd, ...alumnoCategoriaCollection];
    }
    return alumnoCategoriaCollection;
  }
}
