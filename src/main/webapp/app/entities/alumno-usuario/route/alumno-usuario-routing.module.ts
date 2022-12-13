import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AlumnoUsuarioComponent } from '../list/alumno-usuario.component';
import { AlumnoUsuarioDetailComponent } from '../detail/alumno-usuario-detail.component';
import { AlumnoUsuarioUpdateComponent } from '../update/alumno-usuario-update.component';
import { AlumnoUsuarioRoutingResolveService } from './alumno-usuario-routing-resolve.service';

const alumnoUsuarioRoute: Routes = [
  {
    path: '',
    component: AlumnoUsuarioComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlumnoUsuarioDetailComponent,
    resolve: {
      alumnoUsuario: AlumnoUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlumnoUsuarioUpdateComponent,
    resolve: {
      alumnoUsuario: AlumnoUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlumnoUsuarioUpdateComponent,
    resolve: {
      alumnoUsuario: AlumnoUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alumnoUsuarioRoute)],
  exports: [RouterModule],
})
export class AlumnoUsuarioRoutingModule {}
