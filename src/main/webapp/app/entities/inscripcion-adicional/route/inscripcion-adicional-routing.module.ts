import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InscripcionAdicionalComponent } from '../list/inscripcion-adicional.component';
import { InscripcionAdicionalDetailComponent } from '../detail/inscripcion-adicional-detail.component';
import { InscripcionAdicionalUpdateComponent } from '../update/inscripcion-adicional-update.component';
import { InscripcionAdicionalRoutingResolveService } from './inscripcion-adicional-routing-resolve.service';

const inscripcionAdicionalRoute: Routes = [
  {
    path: '',
    component: InscripcionAdicionalComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InscripcionAdicionalDetailComponent,
    resolve: {
      inscripcionAdicional: InscripcionAdicionalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InscripcionAdicionalUpdateComponent,
    resolve: {
      inscripcionAdicional: InscripcionAdicionalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InscripcionAdicionalUpdateComponent,
    resolve: {
      inscripcionAdicional: InscripcionAdicionalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(inscripcionAdicionalRoute)],
  exports: [RouterModule],
})
export class InscripcionAdicionalRoutingModule {}
