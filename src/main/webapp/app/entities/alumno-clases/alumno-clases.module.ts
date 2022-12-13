import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlumnoClasesComponent } from './list/alumno-clases.component';
import { AlumnoClasesDetailComponent } from './detail/alumno-clases-detail.component';
import { AlumnoClasesUpdateComponent } from './update/alumno-clases-update.component';
import { AlumnoClasesDeleteDialogComponent } from './delete/alumno-clases-delete-dialog.component';
import { AlumnoClasesRoutingModule } from './route/alumno-clases-routing.module';

@NgModule({
  imports: [SharedModule, AlumnoClasesRoutingModule],
  declarations: [AlumnoClasesComponent, AlumnoClasesDetailComponent, AlumnoClasesUpdateComponent, AlumnoClasesDeleteDialogComponent],
  entryComponents: [AlumnoClasesDeleteDialogComponent],
})
export class AlumnoClasesModule {}
