import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInscripcion, Inscripcion } from '../inscripcion.model';
import { InscripcionService } from '../service/inscripcion.service';

@Injectable({ providedIn: 'root' })
export class InscripcionRoutingResolveService implements Resolve<IInscripcion> {
  constructor(protected service: InscripcionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInscripcion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((inscripcion: HttpResponse<Inscripcion>) => {
          if (inscripcion.body) {
            return of(inscripcion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Inscripcion());
  }
}
