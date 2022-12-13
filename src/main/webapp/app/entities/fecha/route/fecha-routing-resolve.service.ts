import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFecha, Fecha } from '../fecha.model';
import { FechaService } from '../service/fecha.service';

@Injectable({ providedIn: 'root' })
export class FechaRoutingResolveService implements Resolve<IFecha> {
  constructor(protected service: FechaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFecha> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fecha: HttpResponse<Fecha>) => {
          if (fecha.body) {
            return of(fecha.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fecha());
  }
}
