import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILicenciaCategoria, LicenciaCategoria } from '../licencia-categoria.model';
import { LicenciaCategoriaService } from '../service/licencia-categoria.service';

@Injectable({ providedIn: 'root' })
export class LicenciaCategoriaRoutingResolveService implements Resolve<ILicenciaCategoria> {
  constructor(protected service: LicenciaCategoriaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILicenciaCategoria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((licenciaCategoria: HttpResponse<LicenciaCategoria>) => {
          if (licenciaCategoria.body) {
            return of(licenciaCategoria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LicenciaCategoria());
  }
}
