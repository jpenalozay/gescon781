import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlumnoDesarrolloComponent } from './list/alumno-desarrollo.component';
import { AlumnoDesarrolloDetailComponent } from './detail/alumno-desarrollo-detail.component';
import { AlumnoDesarrolloUpdateComponent } from './update/alumno-desarrollo-update.component';
import { AlumnoDesarrolloDeleteDialogComponent } from './delete/alumno-desarrollo-delete-dialog.component';
import { AlumnoDesarrolloRoutingModule } from './route/alumno-desarrollo-routing.module';

@NgModule({
  imports: [SharedModule, AlumnoDesarrolloRoutingModule],
  declarations: [
    AlumnoDesarrolloComponent,
    AlumnoDesarrolloDetailComponent,
    AlumnoDesarrolloUpdateComponent,
    AlumnoDesarrolloDeleteDialogComponent,
  ],
  entryComponents: [AlumnoDesarrolloDeleteDialogComponent],
})
export class AlumnoDesarrolloModule {}
