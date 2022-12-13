import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInscripcionDetalle, InscripcionDetalle } from '../inscripcion-detalle.model';
import { InscripcionDetalleService } from '../service/inscripcion-detalle.service';

@Injectable({ providedIn: 'root' })
export class InscripcionDetalleRoutingResolveService implements Resolve<IInscripcionDetalle> {
  constructor(protected service: InscripcionDetalleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInscripcionDetalle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((inscripcionDetalle: HttpResponse<InscripcionDetalle>) => {
          if (inscripcionDetalle.body) {
            return of(inscripcionDetalle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InscripcionDetalle());
  }
}
