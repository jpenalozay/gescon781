import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISucursalSerie, SucursalSerie } from '../sucursal-serie.model';
import { SucursalSerieService } from '../service/sucursal-serie.service';

@Injectable({ providedIn: 'root' })
export class SucursalSerieRoutingResolveService implements Resolve<ISucursalSerie> {
  constructor(protected service: SucursalSerieService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISucursalSerie> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((sucursalSerie: HttpResponse<SucursalSerie>) => {
          if (sucursalSerie.body) {
            return of(sucursalSerie.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SucursalSerie());
  }
}
