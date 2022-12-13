import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITeoriaHorarioCatalogo, TeoriaHorarioCatalogo } from '../teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from '../service/teoria-horario-catalogo.service';

@Injectable({ providedIn: 'root' })
export class TeoriaHorarioCatalogoRoutingResolveService implements Resolve<ITeoriaHorarioCatalogo> {
  constructor(protected service: TeoriaHorarioCatalogoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITeoriaHorarioCatalogo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((teoriaHorarioCatalogo: HttpResponse<TeoriaHorarioCatalogo>) => {
          if (teoriaHorarioCatalogo.body) {
            return of(teoriaHorarioCatalogo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TeoriaHorarioCatalogo());
  }
}
