import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAutomovil, Automovil } from '../automovil.model';
import { AutomovilService } from '../service/automovil.service';

@Injectable({ providedIn: 'root' })
export class AutomovilRoutingResolveService implements Resolve<IAutomovil> {
  constructor(protected service: AutomovilService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAutomovil> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((automovil: HttpResponse<Automovil>) => {
          if (automovil.body) {
            return of(automovil.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Automovil());
  }
}
