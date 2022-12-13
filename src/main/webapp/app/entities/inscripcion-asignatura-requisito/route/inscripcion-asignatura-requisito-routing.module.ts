import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InscripcionAsignaturaRequisitoComponent } from '../list/inscripcion-asignatura-requisito.component';
import { InscripcionAsignaturaRequisitoDetailComponent } from '../detail/inscripcion-asignatura-requisito-detail.component';
import { InscripcionAsignaturaRequisitoUpdateComponent } from '../update/inscripcion-asignatura-requisito-update.component';
import { InscripcionAsignaturaRequisitoRoutingResolveService } from './inscripcion-asignatura-requisito-routing-resolve.service';

const inscripcionAsignaturaRequisitoRoute: Routes = [
  {
    path: '',
    component: InscripcionAsignaturaRequisitoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InscripcionAsignaturaRequisitoDetailComponent,
    resolve: {
      inscripcionAsignaturaRequisito: InscripcionAsignaturaRequisitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InscripcionAsignaturaRequisitoUpdateComponent,
    resolve: {
      inscripcionAsignaturaRequisito: InscripcionAsignaturaRequisitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InscripcionAsignaturaRequisitoUpdateComponent,
    resolve: {
      inscripcionAsignaturaRequisito: InscripcionAsignaturaRequisitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(inscripcionAsignaturaRequisitoRoute)],
  exports: [RouterModule],
})
export class InscripcionAsignaturaRequisitoRoutingModule {}
