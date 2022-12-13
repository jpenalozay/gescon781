import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProgramacion, Programacion } from '../programacion.model';
import { ProgramacionService } from '../service/programacion.service';

@Injectable({ providedIn: 'root' })
export class ProgramacionRoutingResolveService implements Resolve<IProgramacion> {
  constructor(protected service: ProgramacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProgramacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((programacion: HttpResponse<Programacion>) => {
          if (programacion.body) {
            return of(programacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Programacion());
  }
}
