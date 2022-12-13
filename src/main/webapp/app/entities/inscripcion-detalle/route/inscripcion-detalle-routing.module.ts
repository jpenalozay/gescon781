import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InscripcionDetalleComponent } from '../list/inscripcion-detalle.component';
import { InscripcionDetalleDetailComponent } from '../detail/inscripcion-detalle-detail.component';
import { InscripcionDetalleUpdateComponent } from '../update/inscripcion-detalle-update.component';
import { InscripcionDetalleRoutingResolveService } from './inscripcion-detalle-routing-resolve.service';

const inscripcionDetalleRoute: Routes = [
  {
    path: '',
    component: InscripcionDetalleComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InscripcionDetalleDetailComponent,
    resolve: {
      inscripcionDetalle: InscripcionDetalleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InscripcionDetalleUpdateComponent,
    resolve: {
      inscripcionDetalle: InscripcionDetalleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InscripcionDetalleUpdateComponent,
    resolve: {
      inscripcionDetalle: InscripcionDetalleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(inscripcionDetalleRoute)],
  exports: [RouterModule],
})
export class InscripcionDetalleRoutingModule {}
