import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InscripcionDescuentoComponent } from '../list/inscripcion-descuento.component';
import { InscripcionDescuentoDetailComponent } from '../detail/inscripcion-descuento-detail.component';
import { InscripcionDescuentoUpdateComponent } from '../update/inscripcion-descuento-update.component';
import { InscripcionDescuentoRoutingResolveService } from './inscripcion-descuento-routing-resolve.service';

const inscripcionDescuentoRoute: Routes = [
  {
    path: '',
    component: InscripcionDescuentoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InscripcionDescuentoDetailComponent,
    resolve: {
      inscripcionDescuento: InscripcionDescuentoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InscripcionDescuentoUpdateComponent,
    resolve: {
      inscripcionDescuento: InscripcionDescuentoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InscripcionDescuentoUpdateComponent,
    resolve: {
      inscripcionDescuento: InscripcionDescuentoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(inscripcionDescuentoRoute)],
  exports: [RouterModule],
})
export class InscripcionDescuentoRoutingModule {}
