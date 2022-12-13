import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AutomovilComponent } from '../list/automovil.component';
import { AutomovilDetailComponent } from '../detail/automovil-detail.component';
import { AutomovilUpdateComponent } from '../update/automovil-update.component';
import { AutomovilRoutingResolveService } from './automovil-routing-resolve.service';

const automovilRoute: Routes = [
  {
    path: '',
    component: AutomovilComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AutomovilDetailComponent,
    resolve: {
      automovil: AutomovilRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AutomovilUpdateComponent,
    resolve: {
      automovil: AutomovilRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AutomovilUpdateComponent,
    resolve: {
      automovil: AutomovilRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(automovilRoute)],
  exports: [RouterModule],
})
export class AutomovilRoutingModule {}
