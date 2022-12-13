import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FechaComponent } from '../list/fecha.component';
import { FechaDetailComponent } from '../detail/fecha-detail.component';
import { FechaRoutingResolveService } from './fecha-routing-resolve.service';

const fechaRoute: Routes = [
  {
    path: '',
    component: FechaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FechaDetailComponent,
    resolve: {
      fecha: FechaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fechaRoute)],
  exports: [RouterModule],
})
export class FechaRoutingModule {}
