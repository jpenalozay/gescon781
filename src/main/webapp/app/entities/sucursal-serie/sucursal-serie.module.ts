import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SucursalSerieComponent } from './list/sucursal-serie.component';
import { SucursalSerieDetailComponent } from './detail/sucursal-serie-detail.component';
import { SucursalSerieUpdateComponent } from './update/sucursal-serie-update.component';
import { SucursalSerieDeleteDialogComponent } from './delete/sucursal-serie-delete-dialog.component';
import { SucursalSerieRoutingModule } from './route/sucursal-serie-routing.module';

@NgModule({
  imports: [SharedModule, SucursalSerieRoutingModule],
  declarations: [SucursalSerieComponent, SucursalSerieDetailComponent, SucursalSerieUpdateComponent, SucursalSerieDeleteDialogComponent],
  entryComponents: [SucursalSerieDeleteDialogComponent],
})
export class SucursalSerieModule {}
