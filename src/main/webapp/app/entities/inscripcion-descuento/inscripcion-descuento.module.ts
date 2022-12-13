import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InscripcionDescuentoComponent } from './list/inscripcion-descuento.component';
import { InscripcionDescuentoDetailComponent } from './detail/inscripcion-descuento-detail.component';
import { InscripcionDescuentoUpdateComponent } from './update/inscripcion-descuento-update.component';
import { InscripcionDescuentoDeleteDialogComponent } from './delete/inscripcion-descuento-delete-dialog.component';
import { InscripcionDescuentoRoutingModule } from './route/inscripcion-descuento-routing.module';

@NgModule({
  imports: [SharedModule, InscripcionDescuentoRoutingModule],
  declarations: [
    InscripcionDescuentoComponent,
    InscripcionDescuentoDetailComponent,
    InscripcionDescuentoUpdateComponent,
    InscripcionDescuentoDeleteDialogComponent,
  ],
  entryComponents: [InscripcionDescuentoDeleteDialogComponent],
})
export class InscripcionDescuentoModule {}
