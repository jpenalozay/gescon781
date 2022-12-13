import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInscripcionAdicional, InscripcionAdicional } from '../inscripcion-adicional.model';
import { InscripcionAdicionalService } from '../service/inscripcion-adicional.service';

@Injectable({ providedIn: 'root' })
export class InscripcionAdicionalRoutingResolveService implements Resolve<IInscripcionAdicional> {
  constructor(protected service: InscripcionAdicionalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInscripcionAdicional> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((inscripcionAdicional: HttpResponse<InscripcionAdicional>) => {
          if (inscripcionAdicional.body) {
            return of(inscripcionAdicional.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InscripcionAdicional());
  }
}
