import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AlumnoCategoriaComponent } from '../list/alumno-categoria.component';
import { AlumnoCategoriaDetailComponent } from '../detail/alumno-categoria-detail.component';
import { AlumnoCategoriaUpdateComponent } from '../update/alumno-categoria-update.component';
import { AlumnoCategoriaRoutingResolveService } from './alumno-categoria-routing-resolve.service';

const alumnoCategoriaRoute: Routes = [
  {
    path: '',
    component: AlumnoCategoriaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlumnoCategoriaDetailComponent,
    resolve: {
      alumnoCategoria: AlumnoCategoriaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlumnoCategoriaUpdateComponent,
    resolve: {
      alumnoCategoria: AlumnoCategoriaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlumnoCategoriaUpdateComponent,
    resolve: {
      alumnoCategoria: AlumnoCategoriaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alumnoCategoriaRoute)],
  exports: [RouterModule],
})
export class AlumnoCategoriaRoutingModule {}
