import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SucursalSerieComponent } from '../list/sucursal-serie.component';
import { SucursalSerieDetailComponent } from '../detail/sucursal-serie-detail.component';
import { SucursalSerieUpdateComponent } from '../update/sucursal-serie-update.component';
import { SucursalSerieRoutingResolveService } from './sucursal-serie-routing-resolve.service';

const sucursalSerieRoute: Routes = [
  {
    path: '',
    component: SucursalSerieComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SucursalSerieDetailComponent,
    resolve: {
      sucursalSerie: SucursalSerieRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SucursalSerieUpdateComponent,
    resolve: {
      sucursalSerie: SucursalSerieRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SucursalSerieUpdateComponent,
    resolve: {
      sucursalSerie: SucursalSerieRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sucursalSerieRoute)],
  exports: [RouterModule],
})
export class SucursalSerieRoutingModule {}
