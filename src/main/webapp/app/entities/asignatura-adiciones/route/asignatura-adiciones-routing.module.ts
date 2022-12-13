import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AsignaturaAdicionesComponent } from '../list/asignatura-adiciones.component';
import { AsignaturaAdicionesDetailComponent } from '../detail/asignatura-adiciones-detail.component';
import { AsignaturaAdicionesUpdateComponent } from '../update/asignatura-adiciones-update.component';
import { AsignaturaAdicionesRoutingResolveService } from './asignatura-adiciones-routing-resolve.service';

const asignaturaAdicionesRoute: Routes = [
  {
    path: '',
    component: AsignaturaAdicionesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AsignaturaAdicionesDetailComponent,
    resolve: {
      asignaturaAdiciones: AsignaturaAdicionesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AsignaturaAdicionesUpdateComponent,
    resolve: {
      asignaturaAdiciones: AsignaturaAdicionesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AsignaturaAdicionesUpdateComponent,
    resolve: {
      asignaturaAdiciones: AsignaturaAdicionesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(asignaturaAdicionesRoute)],
  exports: [RouterModule],
})
export class AsignaturaAdicionesRoutingModule {}
