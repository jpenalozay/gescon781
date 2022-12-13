import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlumnoUsuarioComponent } from './list/alumno-usuario.component';
import { AlumnoUsuarioDetailComponent } from './detail/alumno-usuario-detail.component';
import { AlumnoUsuarioUpdateComponent } from './update/alumno-usuario-update.component';
import { AlumnoUsuarioDeleteDialogComponent } from './delete/alumno-usuario-delete-dialog.component';
import { AlumnoUsuarioRoutingModule } from './route/alumno-usuario-routing.module';

@NgModule({
  imports: [SharedModule, AlumnoUsuarioRoutingModule],
  declarations: [AlumnoUsuarioComponent, AlumnoUsuarioDetailComponent, AlumnoUsuarioUpdateComponent, AlumnoUsuarioDeleteDialogComponent],
  entryComponents: [AlumnoUsuarioDeleteDialogComponent],
})
export class AlumnoUsuarioModule {}
