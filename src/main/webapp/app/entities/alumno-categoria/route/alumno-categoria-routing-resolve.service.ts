import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlumnoCategoria, AlumnoCategoria } from '../alumno-categoria.model';
import { AlumnoCategoriaService } from '../service/alumno-categoria.service';

@Injectable({ providedIn: 'root' })
export class AlumnoCategoriaRoutingResolveService implements Resolve<IAlumnoCategoria> {
  constructor(protected service: AlumnoCategoriaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlumnoCategoria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((alumnoCategoria: HttpResponse<AlumnoCategoria>) => {
          if (alumnoCategoria.body) {
            return of(alumnoCategoria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AlumnoCategoria());
  }
}
