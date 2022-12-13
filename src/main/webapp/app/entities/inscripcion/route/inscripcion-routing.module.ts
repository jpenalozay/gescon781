import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InscripcionComponent } from '../list/inscripcion.component';
import { InscripcionDetailComponent } from '../detail/inscripcion-detail.component';
import { InscripcionUpdateComponent } from '../update/inscripcion-update.component';
import { InscripcionRoutingResolveService } from './inscripcion-routing-resolve.service';

const inscripcionRoute: Routes = [
  {
    path: '',
    component: InscripcionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InscripcionDetailComponent,
    resolve: {
      inscripcion: InscripcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InscripcionUpdateComponent,
    resolve: {
      inscripcion: InscripcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InscripcionUpdateComponent,
    resolve: {
      inscripcion: InscripcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(inscripcionRoute)],
  exports: [RouterModule],
})
export class InscripcionRoutingModule {}
