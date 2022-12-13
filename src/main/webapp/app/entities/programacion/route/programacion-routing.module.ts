import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProgramacionComponent } from '../list/programacion.component';
import { ProgramacionDetailComponent } from '../detail/programacion-detail.component';
import { ProgramacionUpdateComponent } from '../update/programacion-update.component';
import { ProgramacionRoutingResolveService } from './programacion-routing-resolve.service';

const programacionRoute: Routes = [
  {
    path: '',
    component: ProgramacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProgramacionDetailComponent,
    resolve: {
      programacion: ProgramacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProgramacionUpdateComponent,
    resolve: {
      programacion: ProgramacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProgramacionUpdateComponent,
    resolve: {
      programacion: ProgramacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(programacionRoute)],
  exports: [RouterModule],
})
export class ProgramacionRoutingModule {}
