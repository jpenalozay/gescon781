import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDia, Dia } from '../dia.model';
import { DiaService } from '../service/dia.service';

@Injectable({ providedIn: 'root' })
export class DiaRoutingResolveService implements Resolve<IDia> {
  constructor(protected service: DiaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDia> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dia: HttpResponse<Dia>) => {
          if (dia.body) {
            return of(dia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Dia());
  }
}
