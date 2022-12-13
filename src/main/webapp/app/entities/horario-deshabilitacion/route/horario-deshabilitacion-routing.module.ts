import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HorarioDeshabilitacionComponent } from '../list/horario-deshabilitacion.component';
import { HorarioDeshabilitacionDetailComponent } from '../detail/horario-deshabilitacion-detail.component';
import { HorarioDeshabilitacionUpdateComponent } from '../update/horario-deshabilitacion-update.component';
import { HorarioDeshabilitacionRoutingResolveService } from './horario-deshabilitacion-routing-resolve.service';

const horarioDeshabilitacionRoute: Routes = [
  {
    path: '',
    component: HorarioDeshabilitacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HorarioDeshabilitacionDetailComponent,
    resolve: {
      horarioDeshabilitacion: HorarioDeshabilitacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HorarioDeshabilitacionUpdateComponent,
    resolve: {
      horarioDeshabilitacion: HorarioDeshabilitacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HorarioDeshabilitacionUpdateComponent,
    resolve: {
      horarioDeshabilitacion: HorarioDeshabilitacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(horarioDeshabilitacionRoute)],
  exports: [RouterModule],
})
export class HorarioDeshabilitacionRoutingModule {}
