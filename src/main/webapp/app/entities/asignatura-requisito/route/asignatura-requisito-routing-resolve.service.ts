import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAsignaturaRequisito, AsignaturaRequisito } from '../asignatura-requisito.model';
import { AsignaturaRequisitoService } from '../service/asignatura-requisito.service';

@Injectable({ providedIn: 'root' })
export class AsignaturaRequisitoRoutingResolveService implements Resolve<IAsignaturaRequisito> {
  constructor(protected service: AsignaturaRequisitoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAsignaturaRequisito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((asignaturaRequisito: HttpResponse<AsignaturaRequisito>) => {
          if (asignaturaRequisito.body) {
            return of(asignaturaRequisito.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AsignaturaRequisito());
  }
}
