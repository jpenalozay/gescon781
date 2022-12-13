import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDistrit, Distrit } from '../distrit.model';
import { DistritService } from '../service/distrit.service';

@Injectable({ providedIn: 'root' })
export class DistritRoutingResolveService implements Resolve<IDistrit> {
  constructor(protected service: DistritService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDistrit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((distrit: HttpResponse<Distrit>) => {
          if (distrit.body) {
            return of(distrit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Distrit());
  }
}
