import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DistritComponent } from '../list/distrit.component';
import { DistritDetailComponent } from '../detail/distrit-detail.component';
import { DistritRoutingResolveService } from './distrit-routing-resolve.service';

const distritRoute: Routes = [
  {
    path: '',
    component: DistritComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DistritDetailComponent,
    resolve: {
      distrit: DistritRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(distritRoute)],
  exports: [RouterModule],
})
export class DistritRoutingModule {}
