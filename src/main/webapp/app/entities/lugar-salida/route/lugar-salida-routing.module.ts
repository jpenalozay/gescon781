import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LugarSalidaComponent } from '../list/lugar-salida.component';
import { LugarSalidaDetailComponent } from '../detail/lugar-salida-detail.component';
import { LugarSalidaUpdateComponent } from '../update/lugar-salida-update.component';
import { LugarSalidaRoutingResolveService } from './lugar-salida-routing-resolve.service';

const lugarSalidaRoute: Routes = [
  {
    path: '',
    component: LugarSalidaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LugarSalidaDetailComponent,
    resolve: {
      lugarSalida: LugarSalidaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LugarSalidaUpdateComponent,
    resolve: {
      lugarSalida: LugarSalidaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LugarSalidaUpdateComponent,
    resolve: {
      lugarSalida: LugarSalidaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(lugarSalidaRoute)],
  exports: [RouterModule],
})
export class LugarSalidaRoutingModule {}
