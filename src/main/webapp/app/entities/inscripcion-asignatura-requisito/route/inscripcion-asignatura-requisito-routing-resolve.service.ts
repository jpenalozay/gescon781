import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInscripcionAsignaturaRequisito, InscripcionAsignaturaRequisito } from '../inscripcion-asignatura-requisito.model';
import { InscripcionAsignaturaRequisitoService } from '../service/inscripcion-asignatura-requisito.service';

@Injectable({ providedIn: 'root' })
export class InscripcionAsignaturaRequisitoRoutingResolveService implements Resolve<IInscripcionAsignaturaRequisito> {
  constructor(protected service: InscripcionAsignaturaRequisitoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInscripcionAsignaturaRequisito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((inscripcionAsignaturaRequisito: HttpResponse<InscripcionAsignaturaRequisito>) => {
          if (inscripcionAsignaturaRequisito.body) {
            return of(inscripcionAsignaturaRequisito.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InscripcionAsignaturaRequisito());
  }
}
