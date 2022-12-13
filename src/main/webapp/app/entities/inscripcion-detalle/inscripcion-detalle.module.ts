import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InscripcionDetalleComponent } from './list/inscripcion-detalle.component';
import { InscripcionDetalleDetailComponent } from './detail/inscripcion-detalle-detail.component';
import { InscripcionDetalleUpdateComponent } from './update/inscripcion-detalle-update.component';
import { InscripcionDetalleDeleteDialogComponent } from './delete/inscripcion-detalle-delete-dialog.component';
import { InscripcionDetalleRoutingModule } from './route/inscripcion-detalle-routing.module';

@NgModule({
  imports: [SharedModule, InscripcionDetalleRoutingModule],
  declarations: [
    InscripcionDetalleComponent,
    InscripcionDetalleDetailComponent,
    InscripcionDetalleUpdateComponent,
    InscripcionDetalleDeleteDialogComponent,
  ],
  entryComponents: [InscripcionDetalleDeleteDialogComponent],
})
export class InscripcionDetalleModule {}
