import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITeoria, Teoria } from '../teoria.model';
import { TeoriaService } from '../service/teoria.service';

@Injectable({ providedIn: 'root' })
export class TeoriaRoutingResolveService implements Resolve<ITeoria> {
  constructor(protected service: TeoriaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITeoria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((teoria: HttpResponse<Teoria>) => {
          if (teoria.body) {
            return of(teoria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Teoria());
  }
}
