import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHorarioDeshabilitacion, HorarioDeshabilitacion } from '../horario-deshabilitacion.model';
import { HorarioDeshabilitacionService } from '../service/horario-deshabilitacion.service';

@Injectable({ providedIn: 'root' })
export class HorarioDeshabilitacionRoutingResolveService implements Resolve<IHorarioDeshabilitacion> {
  constructor(protected service: HorarioDeshabilitacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHorarioDeshabilitacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((horarioDeshabilitacion: HttpResponse<HorarioDeshabilitacion>) => {
          if (horarioDeshabilitacion.body) {
            return of(horarioDeshabilitacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HorarioDeshabilitacion());
  }
}
