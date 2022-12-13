import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AlumnoClasesComponent } from '../list/alumno-clases.component';
import { AlumnoClasesDetailComponent } from '../detail/alumno-clases-detail.component';
import { AlumnoClasesUpdateComponent } from '../update/alumno-clases-update.component';
import { AlumnoClasesRoutingResolveService } from './alumno-clases-routing-resolve.service';

const alumnoClasesRoute: Routes = [
  {
    path: '',
    component: AlumnoClasesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlumnoClasesDetailComponent,
    resolve: {
      alumnoClases: AlumnoClasesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlumnoClasesUpdateComponent,
    resolve: {
      alumnoClases: AlumnoClasesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlumnoClasesUpdateComponent,
    resolve: {
      alumnoClases: AlumnoClasesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alumnoClasesRoute)],
  exports: [RouterModule],
})
export class AlumnoClasesRoutingModule {}
