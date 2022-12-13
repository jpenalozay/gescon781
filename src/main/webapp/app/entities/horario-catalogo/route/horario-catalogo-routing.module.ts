import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HorarioCatalogoComponent } from '../list/horario-catalogo.component';
import { HorarioCatalogoDetailComponent } from '../detail/horario-catalogo-detail.component';
import { HorarioCatalogoUpdateComponent } from '../update/horario-catalogo-update.component';
import { HorarioCatalogoRoutingResolveService } from './horario-catalogo-routing-resolve.service';

const horarioCatalogoRoute: Routes = [
  {
    path: '',
    component: HorarioCatalogoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HorarioCatalogoDetailComponent,
    resolve: {
      horarioCatalogo: HorarioCatalogoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HorarioCatalogoUpdateComponent,
    resolve: {
      horarioCatalogo: HorarioCatalogoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HorarioCatalogoUpdateComponent,
    resolve: {
      horarioCatalogo: HorarioCatalogoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(horarioCatalogoRoute)],
  exports: [RouterModule],
})
export class HorarioCatalogoRoutingModule {}
