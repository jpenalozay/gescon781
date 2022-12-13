import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InscripcionAdicionalComponent } from './list/inscripcion-adicional.component';
import { InscripcionAdicionalDetailComponent } from './detail/inscripcion-adicional-detail.component';
import { InscripcionAdicionalUpdateComponent } from './update/inscripcion-adicional-update.component';
import { InscripcionAdicionalDeleteDialogComponent } from './delete/inscripcion-adicional-delete-dialog.component';
import { InscripcionAdicionalRoutingModule } from './route/inscripcion-adicional-routing.module';

@NgModule({
  imports: [SharedModule, InscripcionAdicionalRoutingModule],
  declarations: [
    InscripcionAdicionalComponent,
    InscripcionAdicionalDetailComponent,
    InscripcionAdicionalUpdateComponent,
    InscripcionAdicionalDeleteDialogComponent,
  ],
  entryComponents: [InscripcionAdicionalDeleteDialogComponent],
})
export class InscripcionAdicionalModule {}
