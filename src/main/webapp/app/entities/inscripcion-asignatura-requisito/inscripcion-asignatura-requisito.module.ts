import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InscripcionAsignaturaRequisitoComponent } from './list/inscripcion-asignatura-requisito.component';
import { InscripcionAsignaturaRequisitoDetailComponent } from './detail/inscripcion-asignatura-requisito-detail.component';
import { InscripcionAsignaturaRequisitoUpdateComponent } from './update/inscripcion-asignatura-requisito-update.component';
import { InscripcionAsignaturaRequisitoDeleteDialogComponent } from './delete/inscripcion-asignatura-requisito-delete-dialog.component';
import { InscripcionAsignaturaRequisitoRoutingModule } from './route/inscripcion-asignatura-requisito-routing.module';

@NgModule({
  imports: [SharedModule, InscripcionAsignaturaRequisitoRoutingModule],
  declarations: [
    InscripcionAsignaturaRequisitoComponent,
    InscripcionAsignaturaRequisitoDetailComponent,
    InscripcionAsignaturaRequisitoUpdateComponent,
    InscripcionAsignaturaRequisitoDeleteDialogComponent,
  ],
  entryComponents: [InscripcionAsignaturaRequisitoDeleteDialogComponent],
})
export class InscripcionAsignaturaRequisitoModule {}
