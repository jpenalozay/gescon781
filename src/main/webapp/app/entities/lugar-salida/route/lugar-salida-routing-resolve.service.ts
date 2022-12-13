import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILugarSalida, LugarSalida } from '../lugar-salida.model';
import { LugarSalidaService } from '../service/lugar-salida.service';

@Injectable({ providedIn: 'root' })
export class LugarSalidaRoutingResolveService implements Resolve<ILugarSalida> {
  constructor(protected service: LugarSalidaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILugarSalida> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((lugarSalida: HttpResponse<LugarSalida>) => {
          if (lugarSalida.body) {
            return of(lugarSalida.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LugarSalida());
  }
}
