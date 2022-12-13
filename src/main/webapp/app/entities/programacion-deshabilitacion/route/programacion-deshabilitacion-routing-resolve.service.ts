import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProgramacionDeshabilitacion, ProgramacionDeshabilitacion } from '../programacion-deshabilitacion.model';
import { ProgramacionDeshabilitacionService } from '../service/programacion-deshabilitacion.service';

@Injectable({ providedIn: 'root' })
export class ProgramacionDeshabilitacionRoutingResolveService implements Resolve<IProgramacionDeshabilitacion> {
  constructor(protected service: ProgramacionDeshabilitacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProgramacionDeshabilitacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((programacionDeshabilitacion: HttpResponse<ProgramacionDeshabilitacion>) => {
          if (programacionDeshabilitacion.body) {
            return of(programacionDeshabilitacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProgramacionDeshabilitacion());
  }
}
