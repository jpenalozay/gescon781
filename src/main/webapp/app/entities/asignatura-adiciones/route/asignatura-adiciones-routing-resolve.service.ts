import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAsignaturaAdiciones, AsignaturaAdiciones } from '../asignatura-adiciones.model';
import { AsignaturaAdicionesService } from '../service/asignatura-adiciones.service';

@Injectable({ providedIn: 'root' })
export class AsignaturaAdicionesRoutingResolveService implements Resolve<IAsignaturaAdiciones> {
  constructor(protected service: AsignaturaAdicionesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAsignaturaAdiciones> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((asignaturaAdiciones: HttpResponse<AsignaturaAdiciones>) => {
          if (asignaturaAdiciones.body) {
            return of(asignaturaAdiciones.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AsignaturaAdiciones());
  }
}
