import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InscripcionComponent } from './list/inscripcion.component';
import { InscripcionDetailComponent } from './detail/inscripcion-detail.component';
import { InscripcionUpdateComponent } from './update/inscripcion-update.component';
import { InscripcionDeleteDialogComponent } from './delete/inscripcion-delete-dialog.component';
import { InscripcionRoutingModule } from './route/inscripcion-routing.module';

@NgModule({
  imports: [SharedModule, InscripcionRoutingModule],
  declarations: [InscripcionComponent, InscripcionDetailComponent, InscripcionUpdateComponent, InscripcionDeleteDialogComponent],
  entryComponents: [InscripcionDeleteDialogComponent],
})
export class InscripcionModule {}
