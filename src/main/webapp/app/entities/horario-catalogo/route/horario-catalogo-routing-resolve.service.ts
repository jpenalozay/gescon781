import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHorarioCatalogo, HorarioCatalogo } from '../horario-catalogo.model';
import { HorarioCatalogoService } from '../service/horario-catalogo.service';

@Injectable({ providedIn: 'root' })
export class HorarioCatalogoRoutingResolveService implements Resolve<IHorarioCatalogo> {
  constructor(protected service: HorarioCatalogoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHorarioCatalogo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((horarioCatalogo: HttpResponse<HorarioCatalogo>) => {
          if (horarioCatalogo.body) {
            return of(horarioCatalogo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HorarioCatalogo());
  }
}
