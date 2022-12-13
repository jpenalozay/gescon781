import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LicenciaCategoriaComponent } from '../list/licencia-categoria.component';
import { LicenciaCategoriaDetailComponent } from '../detail/licencia-categoria-detail.component';
import { LicenciaCategoriaUpdateComponent } from '../update/licencia-categoria-update.component';
import { LicenciaCategoriaRoutingResolveService } from './licencia-categoria-routing-resolve.service';

const licenciaCategoriaRoute: Routes = [
  {
    path: '',
    component: LicenciaCategoriaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LicenciaCategoriaDetailComponent,
    resolve: {
      licenciaCategoria: LicenciaCategoriaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LicenciaCategoriaUpdateComponent,
    resolve: {
      licenciaCategoria: LicenciaCategoriaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LicenciaCategoriaUpdateComponent,
    resolve: {
      licenciaCategoria: LicenciaCategoriaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(licenciaCategoriaRoute)],
  exports: [RouterModule],
})
export class LicenciaCategoriaRoutingModule {}
