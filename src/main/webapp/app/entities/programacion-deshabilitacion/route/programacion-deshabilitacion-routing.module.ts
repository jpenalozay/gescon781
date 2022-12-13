import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProgramacionDeshabilitacionComponent } from '../list/programacion-deshabilitacion.component';
import { ProgramacionDeshabilitacionDetailComponent } from '../detail/programacion-deshabilitacion-detail.component';
import { ProgramacionDeshabilitacionUpdateComponent } from '../update/programacion-deshabilitacion-update.component';
import { ProgramacionDeshabilitacionRoutingResolveService } from './programacion-deshabilitacion-routing-resolve.service';

const programacionDeshabilitacionRoute: Routes = [
  {
    path: '',
    component: ProgramacionDeshabilitacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProgramacionDeshabilitacionDetailComponent,
    resolve: {
      programacionDeshabilitacion: ProgramacionDeshabilitacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProgramacionDeshabilitacionUpdateComponent,
    resolve: {
      programacionDeshabilitacion: ProgramacionDeshabilitacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProgramacionDeshabilitacionUpdateComponent,
    resolve: {
      programacionDeshabilitacion: ProgramacionDeshabilitacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(programacionDeshabilitacionRoute)],
  exports: [RouterModule],
})
export class ProgramacionDeshabilitacionRoutingModule {}
