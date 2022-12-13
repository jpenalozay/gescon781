import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InscripcionPagoComponent } from '../list/inscripcion-pago.component';
import { InscripcionPagoDetailComponent } from '../detail/inscripcion-pago-detail.component';
import { InscripcionPagoUpdateComponent } from '../update/inscripcion-pago-update.component';
import { InscripcionPagoRoutingResolveService } from './inscripcion-pago-routing-resolve.service';

const inscripcionPagoRoute: Routes = [
  {
    path: '',
    component: InscripcionPagoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InscripcionPagoDetailComponent,
    resolve: {
      inscripcionPago: InscripcionPagoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InscripcionPagoUpdateComponent,
    resolve: {
      inscripcionPago: InscripcionPagoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InscripcionPagoUpdateComponent,
    resolve: {
      inscripcionPago: InscripcionPagoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(inscripcionPagoRoute)],
  exports: [RouterModule],
})
export class InscripcionPagoRoutingModule {}
