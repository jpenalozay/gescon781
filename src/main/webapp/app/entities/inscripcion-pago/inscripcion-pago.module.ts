import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InscripcionPagoComponent } from './list/inscripcion-pago.component';
import { InscripcionPagoDetailComponent } from './detail/inscripcion-pago-detail.component';
import { InscripcionPagoUpdateComponent } from './update/inscripcion-pago-update.component';
import { InscripcionPagoDeleteDialogComponent } from './delete/inscripcion-pago-delete-dialog.component';
import { InscripcionPagoRoutingModule } from './route/inscripcion-pago-routing.module';

@NgModule({
  imports: [SharedModule, InscripcionPagoRoutingModule],
  declarations: [
    InscripcionPagoComponent,
    InscripcionPagoDetailComponent,
    InscripcionPagoUpdateComponent,
    InscripcionPagoDeleteDialogComponent,
  ],
  entryComponents: [InscripcionPagoDeleteDialogComponent],
})
export class InscripcionPagoModule {}
