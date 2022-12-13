import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RequisitosInscripcionComponent } from './list/requisitos-inscripcion.component';
import { RequisitosInscripcionDetailComponent } from './detail/requisitos-inscripcion-detail.component';
import { RequisitosInscripcionUpdateComponent } from './update/requisitos-inscripcion-update.component';
import { RequisitosInscripcionDeleteDialogComponent } from './delete/requisitos-inscripcion-delete-dialog.component';
import { RequisitosInscripcionRoutingModule } from './route/requisitos-inscripcion-routing.module';

@NgModule({
  imports: [SharedModule, RequisitosInscripcionRoutingModule],
  declarations: [
    RequisitosInscripcionComponent,
    RequisitosInscripcionDetailComponent,
    RequisitosInscripcionUpdateComponent,
    RequisitosInscripcionDeleteDialogComponent,
  ],
  entryComponents: [RequisitosInscripcionDeleteDialogComponent],
})
export class RequisitosInscripcionModule {}
