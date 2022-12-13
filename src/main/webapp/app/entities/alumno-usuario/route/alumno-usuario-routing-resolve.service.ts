import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlumnoUsuario, AlumnoUsuario } from '../alumno-usuario.model';
import { AlumnoUsuarioService } from '../service/alumno-usuario.service';

@Injectable({ providedIn: 'root' })
export class AlumnoUsuarioRoutingResolveService implements Resolve<IAlumnoUsuario> {
  constructor(protected service: AlumnoUsuarioService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlumnoUsuario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((alumnoUsuario: HttpResponse<AlumnoUsuario>) => {
          if (alumnoUsuario.body) {
            return of(alumnoUsuario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AlumnoUsuario());
  }
}
