import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILicenciaCategoria, getLicenciaCategoriaIdentifier } from '../licencia-categoria.model';

export type EntityResponseType = HttpResponse<ILicenciaCategoria>;
export type EntityArrayResponseType = HttpResponse<ILicenciaCategoria[]>;

@Injectable({ providedIn: 'root' })
export class LicenciaCategoriaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/licencia-categorias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(licenciaCategoria: ILicenciaCategoria): Observable<EntityResponseType> {
    return this.http.post<ILicenciaCategoria>(this.resourceUrl, licenciaCategoria, { observe: 'response' });
  }

  update(licenciaCategoria: ILicenciaCategoria): Observable<EntityResponseType> {
    return this.http.put<ILicenciaCategoria>(
      `${this.resourceUrl}/${getLicenciaCategoriaIdentifier(licenciaCategoria) as number}`,
      licenciaCategoria,
      { observe: 'response' }
    );
  }

  partialUpdate(licenciaCategoria: ILicenciaCategoria): Observable<EntityResponseType> {
    return this.http.patch<ILicenciaCategoria>(
      `${this.resourceUrl}/${getLicenciaCategoriaIdentifier(licenciaCategoria) as number}`,
      licenciaCategoria,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILicenciaCategoria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILicenciaCategoria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLicenciaCategoriaToCollectionIfMissing(
    licenciaCategoriaCollection: ILicenciaCategoria[],
    ...licenciaCategoriasToCheck: (ILicenciaCategoria | null | undefined)[]
  ): ILicenciaCategoria[] {
    const licenciaCategorias: ILicenciaCategoria[] = licenciaCategoriasToCheck.filter(isPresent);
    if (licenciaCategorias.length > 0) {
      const licenciaCategoriaCollectionIdentifiers = licenciaCategoriaCollection.map(
        licenciaCategoriaItem => getLicenciaCategoriaIdentifier(licenciaCategoriaItem)!
      );
      const licenciaCategoriasToAdd = licenciaCategorias.filter(licenciaCategoriaItem => {
        const licenciaCategoriaIdentifier = getLicenciaCategoriaIdentifier(licenciaCategoriaItem);
        if (licenciaCategoriaIdentifier == null || licenciaCategoriaCollectionIdentifiers.includes(licenciaCategoriaIdentifier)) {
          return false;
        }
        licenciaCategoriaCollectionIdentifiers.push(licenciaCategoriaIdentifier);
        return true;
      });
      return [...licenciaCategoriasToAdd, ...licenciaCategoriaCollection];
    }
    return licenciaCategoriaCollection;
  }
}
