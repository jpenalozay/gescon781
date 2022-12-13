import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInscripcionDescuento, InscripcionDescuento } from '../inscripcion-descuento.model';
import { InscripcionDescuentoService } from '../service/inscripcion-descuento.service';

@Injectable({ providedIn: 'root' })
export class InscripcionDescuentoRoutingResolveService implements Resolve<IInscripcionDescuento> {
  constructor(protected service: InscripcionDescuentoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInscripcionDescuento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((inscripcionDescuento: HttpResponse<InscripcionDescuento>) => {
          if (inscripcionDescuento.body) {
            return of(inscripcionDescuento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InscripcionDescuento());
  }
}
