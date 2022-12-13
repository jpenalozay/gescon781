import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AsignaturaRequisitoComponent } from './list/asignatura-requisito.component';
import { AsignaturaRequisitoDetailComponent } from './detail/asignatura-requisito-detail.component';
import { AsignaturaRequisitoUpdateComponent } from './update/asignatura-requisito-update.component';
import { AsignaturaRequisitoDeleteDialogComponent } from './delete/asignatura-requisito-delete-dialog.component';
import { AsignaturaRequisitoRoutingModule } from './route/asignatura-requisito-routing.module';

@NgModule({
  imports: [SharedModule, AsignaturaRequisitoRoutingModule],
  declarations: [
    AsignaturaRequisitoComponent,
    AsignaturaRequisitoDetailComponent,
    AsignaturaRequisitoUpdateComponent,
    AsignaturaRequisitoDeleteDialogComponent,
  ],
  entryComponents: [AsignaturaRequisitoDeleteDialogComponent],
})
export class AsignaturaRequisitoModule {}
