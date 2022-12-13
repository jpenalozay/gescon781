import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRequisitosInscripcion, RequisitosInscripcion } from '../requisitos-inscripcion.model';
import { RequisitosInscripcionService } from '../service/requisitos-inscripcion.service';

@Injectable({ providedIn: 'root' })
export class RequisitosInscripcionRoutingResolveService implements Resolve<IRequisitosInscripcion> {
  constructor(protected service: RequisitosInscripcionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRequisitosInscripcion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((requisitosInscripcion: HttpResponse<RequisitosInscripcion>) => {
          if (requisitosInscripcion.body) {
            return of(requisitosInscripcion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RequisitosInscripcion());
  }
}
