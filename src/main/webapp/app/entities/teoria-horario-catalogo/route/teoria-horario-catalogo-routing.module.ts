import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TeoriaHorarioCatalogoComponent } from '../list/teoria-horario-catalogo.component';
import { TeoriaHorarioCatalogoDetailComponent } from '../detail/teoria-horario-catalogo-detail.component';
import { TeoriaHorarioCatalogoUpdateComponent } from '../update/teoria-horario-catalogo-update.component';
import { TeoriaHorarioCatalogoRoutingResolveService } from './teoria-horario-catalogo-routing-resolve.service';

const teoriaHorarioCatalogoRoute: Routes = [
  {
    path: '',
    component: TeoriaHorarioCatalogoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TeoriaHorarioCatalogoDetailComponent,
    resolve: {
      teoriaHorarioCatalogo: TeoriaHorarioCatalogoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TeoriaHorarioCatalogoUpdateComponent,
    resolve: {
      teoriaHorarioCatalogo: TeoriaHorarioCatalogoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TeoriaHorarioCatalogoUpdateComponent,
    resolve: {
      teoriaHorarioCatalogo: TeoriaHorarioCatalogoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(teoriaHorarioCatalogoRoute)],
  exports: [RouterModule],
})
export class TeoriaHorarioCatalogoRoutingModule {}
