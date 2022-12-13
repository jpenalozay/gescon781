import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TeoriaComponent } from '../list/teoria.component';
import { TeoriaDetailComponent } from '../detail/teoria-detail.component';
import { TeoriaUpdateComponent } from '../update/teoria-update.component';
import { TeoriaRoutingResolveService } from './teoria-routing-resolve.service';

const teoriaRoute: Routes = [
  {
    path: '',
    component: TeoriaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TeoriaDetailComponent,
    resolve: {
      teoria: TeoriaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TeoriaUpdateComponent,
    resolve: {
      teoria: TeoriaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TeoriaUpdateComponent,
    resolve: {
      teoria: TeoriaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(teoriaRoute)],
  exports: [RouterModule],
})
export class TeoriaRoutingModule {}
