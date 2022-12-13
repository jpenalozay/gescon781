import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlumnoDesarrollo, AlumnoDesarrollo } from '../alumno-desarrollo.model';
import { AlumnoDesarrolloService } from '../service/alumno-desarrollo.service';

@Injectable({ providedIn: 'root' })
export class AlumnoDesarrolloRoutingResolveService implements Resolve<IAlumnoDesarrollo> {
  constructor(protected service: AlumnoDesarrolloService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlumnoDesarrollo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((alumnoDesarrollo: HttpResponse<AlumnoDesarrollo>) => {
          if (alumnoDesarrollo.body) {
            return of(alumnoDesarrollo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AlumnoDesarrollo());
  }
}
