import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlumnoClases, AlumnoClases } from '../alumno-clases.model';
import { AlumnoClasesService } from '../service/alumno-clases.service';

@Injectable({ providedIn: 'root' })
export class AlumnoClasesRoutingResolveService implements Resolve<IAlumnoClases> {
  constructor(protected service: AlumnoClasesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlumnoClases> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((alumnoClases: HttpResponse<AlumnoClases>) => {
          if (alumnoClases.body) {
            return of(alumnoClases.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AlumnoClases());
  }
}
