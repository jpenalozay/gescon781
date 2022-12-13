import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ComputadoraComponent } from '../list/computadora.component';
import { ComputadoraDetailComponent } from '../detail/computadora-detail.component';
import { ComputadoraUpdateComponent } from '../update/computadora-update.component';
import { ComputadoraRoutingResolveService } from './computadora-routing-resolve.service';

const computadoraRoute: Routes = [
  {
    path: '',
    component: ComputadoraComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComputadoraDetailComponent,
    resolve: {
      computadora: ComputadoraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComputadoraUpdateComponent,
    resolve: {
      computadora: ComputadoraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComputadoraUpdateComponent,
    resolve: {
      computadora: ComputadoraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(computadoraRoute)],
  exports: [RouterModule],
})
export class ComputadoraRoutingModule {}
