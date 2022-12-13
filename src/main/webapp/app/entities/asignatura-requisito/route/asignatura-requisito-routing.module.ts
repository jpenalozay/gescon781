import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AsignaturaRequisitoComponent } from '../list/asignatura-requisito.component';
import { AsignaturaRequisitoDetailComponent } from '../detail/asignatura-requisito-detail.component';
import { AsignaturaRequisitoUpdateComponent } from '../update/asignatura-requisito-update.component';
import { AsignaturaRequisitoRoutingResolveService } from './asignatura-requisito-routing-resolve.service';

const asignaturaRequisitoRoute: Routes = [
  {
    path: '',
    component: AsignaturaRequisitoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AsignaturaRequisitoDetailComponent,
    resolve: {
      asignaturaRequisito: AsignaturaRequisitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AsignaturaRequisitoUpdateComponent,
    resolve: {
      asignaturaRequisito: AsignaturaRequisitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AsignaturaRequisitoUpdateComponent,
    resolve: {
      asignaturaRequisito: AsignaturaRequisitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(asignaturaRequisitoRoute)],
  exports: [RouterModule],
})
export class AsignaturaRequisitoRoutingModule {}
