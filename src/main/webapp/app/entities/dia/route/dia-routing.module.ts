import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DiaComponent } from '../list/dia.component';
import { DiaDetailComponent } from '../detail/dia-detail.component';
import { DiaUpdateComponent } from '../update/dia-update.component';
import { DiaRoutingResolveService } from './dia-routing-resolve.service';

const diaRoute: Routes = [
  {
    path: '',
    component: DiaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiaDetailComponent,
    resolve: {
      dia: DiaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiaUpdateComponent,
    resolve: {
      dia: DiaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiaUpdateComponent,
    resolve: {
      dia: DiaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(diaRoute)],
  exports: [RouterModule],
})
export class DiaRoutingModule {}
