import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInscripcionPago, InscripcionPago } from '../inscripcion-pago.model';
import { InscripcionPagoService } from '../service/inscripcion-pago.service';

@Injectable({ providedIn: 'root' })
export class InscripcionPagoRoutingResolveService implements Resolve<IInscripcionPago> {
  constructor(protected service: InscripcionPagoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInscripcionPago> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((inscripcionPago: HttpResponse<InscripcionPago>) => {
          if (inscripcionPago.body) {
            return of(inscripcionPago.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InscripcionPago());
  }
}
