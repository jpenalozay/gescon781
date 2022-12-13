import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RequisitosInscripcionComponent } from '../list/requisitos-inscripcion.component';
import { RequisitosInscripcionDetailComponent } from '../detail/requisitos-inscripcion-detail.component';
import { RequisitosInscripcionUpdateComponent } from '../update/requisitos-inscripcion-update.component';
import { RequisitosInscripcionRoutingResolveService } from './requisitos-inscripcion-routing-resolve.service';

const requisitosInscripcionRoute: Routes = [
  {
    path: '',
    component: RequisitosInscripcionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RequisitosInscripcionDetailComponent,
    resolve: {
      requisitosInscripcion: RequisitosInscripcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RequisitosInscripcionUpdateComponent,
    resolve: {
      requisitosInscripcion: RequisitosInscripcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RequisitosInscripcionUpdateComponent,
    resolve: {
      requisitosInscripcion: RequisitosInscripcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(requisitosInscripcionRoute)],
  exports: [RouterModule],
})
export class RequisitosInscripcionRoutingModule {}
