import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AlumnoDesarrolloComponent } from '../list/alumno-desarrollo.component';
import { AlumnoDesarrolloDetailComponent } from '../detail/alumno-desarrollo-detail.component';
import { AlumnoDesarrolloUpdateComponent } from '../update/alumno-desarrollo-update.component';
import { AlumnoDesarrolloRoutingResolveService } from './alumno-desarrollo-routing-resolve.service';

const alumnoDesarrolloRoute: Routes = [
  {
    path: '',
    component: AlumnoDesarrolloComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlumnoDesarrolloDetailComponent,
    resolve: {
      alumnoDesarrollo: AlumnoDesarrolloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlumnoDesarrolloUpdateComponent,
    resolve: {
      alumnoDesarrollo: AlumnoDesarrolloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlumnoDesarrolloUpdateComponent,
    resolve: {
      alumnoDesarrollo: AlumnoDesarrolloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alumnoDesarrolloRoute)],
  exports: [RouterModule],
})
export class AlumnoDesarrolloRoutingModule {}
